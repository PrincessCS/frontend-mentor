const commentContainer = document.querySelector(".comment-container");
const replyBtn = document.getElementById("reply-btn");

function fetchData(){
    fetch('data.json')
    .then(reponse => reponse.json())
    .then(data => {
        data.comments.forEach(comment => {
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment-div");
            commentDiv.innerHTML = `
            <div class="vote-container">
             <button class="upvote-btn"><img src= "./images/icon-plus.svg" alt="add-icon" id="upvote-btn"></button>
             <p class="score">${comment.score}</p>
             <button class="downvote-btn"><img src= "./images/icon-minus.svg" alt="minus-icon" id="downvote-btn"></button>
            </div>

            <div class="comment">
             <div class="comment-header">
              <div class="user-container">
               <img src="${comment.user.image.png}" alt="${comment.user.username}" id="user-img">
               <span>${comment.user.username}</span>
               <span>${comment.createdAt}</span>
              </div>

              <div>
               <img src="./images/icon-reply.svg" alt="reply-icon" id="reply">
              </div>

             </div>
             <div>
              <p>${comment.content}</p>
             </div>
            </div>    
            `
            
            commentContainer.appendChild(commentDiv);

            const commentId = comment.id;
            const scoreKey = `comment-score-${commentId}`;
            const scoreDisplay = commentDiv.querySelector(".score");
            const storedScore = localStorage.getItem(scoreKey);
            let score = storedScore !== null ? parseInt(storedScore) : comment.score;
            scoreDisplay.textContent = score;

            const upVote = commentDiv.querySelector(".upvote-btn");
            const downVote = commentDiv.querySelector(".downvote-btn");
            
            localStorage.setItem(scoreKey, score);

            upVote.addEventListener('click', (e) => {
              e.preventDefault();
              score++;
              scoreDisplay.textContent = score;
              localStorage.setItem(scoreKey, score);
            });
            downVote.addEventListener('click', (e) => {
              e.preventDefault();
              if (score > 0) {
                    score--;
                    scoreDisplay.textContent = score;
                    localStorage.setItem(scoreKey, score);
              }
            })   
            
        }
            
        ); 
    }
  )
    .catch(err => console.error("Error loading data: ", err));
}



function fetchReply() {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      data.comments.forEach(comment => {
        comment.replies.forEach(reply => {
          const replyDiv = document.createElement("div");
          replyDiv.classList.add("reply-div");
          replyDiv.innerHTML = `
            <div class="vote-container">
             <button class="upvote-btn"><img src= "./images/icon-plus.svg" alt="add-icon" id="upvote-btn"></button>
             <p class="score">${reply.score}</p>
             <button class="downvote-btn"><img src= "./images/icon-minus.svg" alt="minus-icon" id="downvote-btn"></button>
            </div>

            <div class="comment">
             <div class="comment-header">
              <div class="user-container">
               <img src="${reply.user.image.png}" alt="${reply.user.username}" id="user-img">
               <span>${reply.user.username}</span>
               <span>${reply.createdAt}</span>
              </div>

              <div>
               <img src="./images/icon-reply.svg" alt="reply-icon" id="reply">
              </div>

             </div>
             <div>
              <p>${reply.content}</p>
             </div>
            </div>    
          `;
          commentContainer.append(replyDiv);

          const commentId = comment.id;
            const scoreKey = `comment-score-${commentId}`;
            const scoreDisplay = replyDiv.querySelector(".score");
            const storedScore = localStorage.getItem(scoreKey);
            let score = storedScore !== null ? parseInt(storedScore) : comment.score;
            scoreDisplay.textContent = score;

            const upVote = replyDiv.querySelector(".upvote-btn");
            const downVote = replyDiv.querySelector(".downvote-btn");
            
            localStorage.setItem(scoreKey, score);

            upVote.addEventListener('click', (e) => {
              e.preventDefault();
              score++;
              scoreDisplay.textContent = score;
              localStorage.setItem(scoreKey, score);
            });
            downVote.addEventListener('click', (e) => {
              e.preventDefault();
              if (score > 0) {
                    score--;
                    scoreDisplay.textContent = score;
                    localStorage.setItem(scoreKey, score);
              }
            })   
            
        });
      });
    })
    .catch(err => console.error("Error loading replies: ", err));
}



function sendComment() {
  const commentBoxContainer = document.querySelector(".comment-box-container");
  const commentBox = document.createElement("div");
  const commentInput = document.createElement("textarea");
  commentInput.placeholder = "Add a comment...";
  const sendBtn = document.createElement("button");
  sendBtn.textContent = "Send";

  commentBox.appendChild(commentInput);
  commentBox.appendChild(sendBtn);
  commentBoxContainer.appendChild(commentBox);

  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const currentUserImage = document.createElement("img");
      currentUserImage.src = data.currentUser.image.png;
      commentBox.appendChild(currentUserImage);

      sendBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const userComment = commentInput.value.trim();

        if (userComment === "") {
          alert("Comment cannot be empty.");
          return;
        }

        const commentData = {
          text: userComment,
          score: 0,
          timestamp: new Date().toISOString(),
          user: {
            username: data.currentUser.username,
            image: data.currentUser.image.png
          }
        };

        let storedComments = JSON.parse(localStorage.getItem("user-comments")) || [];
        storedComments.push(commentData);
        localStorage.setItem("user-comments", JSON.stringify(storedComments));

        renderComment(commentData);
        commentInput.value = "";
      });
    })
    .catch(err => console.error("Error loading current user: ", err));
}

// Renders a comment on the page
function renderComment(commentData) {
  const commentContainer = document.querySelector(".comment-box-container");

  const userCommentDiv = document.createElement("div");
  userCommentDiv.classList.add("comment-div");
  userCommentDiv.innerHTML = `
    <div class="vote-container">
      <button class="upvote-btn"><img src="./images/icon-plus.svg" alt="add-icon"></button>
      <p class="score">${commentData.score}</p>
      <button class="downvote-btn"><img src="./images/icon-minus.svg" alt="minus-icon"></button>
    </div>
    <div class="comment">
      <div class="comment-header">
        <div class="user-container">
          <img src="${commentData.user.image}" alt="${commentData.user.username}" id="user-img">
          <span>${commentData.user.username}</span>
          <span>Just now</span>
        </div>
        <div>
          <img src="./images/icon-reply.svg" alt="reply-icon" id="reply">
        </div>
      </div>
      <div>
        <p>${commentData.text}</p>
      </div>
    </div>
  `;

  commentContainer.appendChild(userCommentDiv);

  // Voting logic
  const scoreDisplay = userCommentDiv.querySelector(".score");
  let score = commentData.score;

  const upVote = userCommentDiv.querySelector(".upvote-btn");
  const downVote = userCommentDiv.querySelector(".downvote-btn");

  upVote.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    updateStoredComment(commentData, score);
  });

  downVote.addEventListener("click", () => {
    if (score > 0) {
      score--;
      scoreDisplay.textContent = score;
      updateStoredComment(commentData, score);
    }
  });
}

// Updates the vote score in localStorage
function updateStoredComment(originalComment, newScore) {
  let storedComments = JSON.parse(localStorage.getItem("user-comments")) || [];

  storedComments = storedComments.map(comment => {
    if (
      comment.text === originalComment.text &&
      comment.timestamp === originalComment.timestamp
    ) {
      comment.score = newScore;
    }
    return comment;
  });

  localStorage.setItem("user-comments", JSON.stringify(storedComments));
}

// Load existing comments from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const storedComments = JSON.parse(localStorage.getItem("user-comments")) || [];
  storedComments.forEach(comment => {
    renderComment(comment);
  });

  sendComment(); // Only call this after DOM is ready
});



fetchData();
fetchReply();
