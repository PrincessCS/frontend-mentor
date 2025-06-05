//image upload
const uploadInput = document.getElementById('upload');
const preview = document.getElementById('preview');
const previewContainer = document.getElementById("preview-container");
const uploadPlaceholder = document.querySelector(".placeholder");
const uploadIcon = document.querySelector(".upload-icon");
const removeImgBtn = document.getElementById("remove-img");
const changeImgBtn = document.getElementById("change-img");

uploadInput.addEventListener('change', function () {
    const file = this.files[0];
    const maxSize = 500 * 1024;
    const fileType = ["image/png", "image/jpeg"];
    if(!fileType.includes(file.type)){
      alert("Invalid file format. Please upload a PNG or JPEG file!");
      uploadInput.value = "";
      return;
    }

    if(file.size > maxSize){
      alert("File size too large! Please upload a picture less than 500KB.");
      uploadInput.value = "";
      return;
    }

      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target.result;
        previewContainer.style.display = "block";
        preview.src = imageData;
        preview.style.display = 'block';
        uploadIcon.style.display = "none";
        uploadPlaceholder.style.display = "none";
        localStorage.setItem("userImage", imageData);
      };
      reader.readAsDataURL(file);
});


//removing image
removeImgBtn.addEventListener("click", (e) =>{
  e.preventDefault();
  const imageData = e.target.result;
  preview.src = "";
  previewContainer.style.display = "none";
  preview.style.display = "none";
  uploadIcon.style.display = "block";
  uploadPlaceholder.style.display = "block";
  uploadInput.value = "";
  localStorage.removeItem("userImage", imageData);
})

//changing image
changeImgBtn.addEventListener("click", (e) => {
  e.preventDefault();
  uploadInput.click();
})
   
//ticket generation and error handling
function generateTicket(){
    const nameInput = document.getElementById("full-name");
    const emailInput = document.getElementById("email");
    const gitHub = document.getElementById("github");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const gitError = document.getElementById("github-error");
    const imageError = document.getElementById("image-error");

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const gitValue = gitHub.value.trim();

    let isValid = true;

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //image validation
    const storedImage = localStorage.getItem("userImage");
    if(!storedImage || uploadInput.value === ""){
      imageError.textContent = "This field is required";
      isValid = false;
    } else {
      imageError.textContent = "";
    }
   
    //name validation
    if(nameValue === ""){
        nameError.textContent = "This field is required";
        isValid = false;
    } else{
        nameError.textContent = "";
    }
    
    //email validation
    if(emailValue === ""){
      emailError.textContent = "This field is required";
      isValid = false;
    } else if(!regex.test(emailValue)){
      emailError.textContent = "Please enter a valid email address";
      isValid = false;
    }else{
      emailError.textContent = "";
    }
    
    //github validation
    if(gitValue === ""){
      gitError.textContent = "This field is required";
      isValid = false;
    }else{
      gitError.textContent = "";
    }
    
   return isValid;
   

}

//get image even after reload of page
document.addEventListener("DOMContentLoaded", () => {
  const storedImage = localStorage.getItem("userImage");
  if (storedImage) {
    preview.src = storedImage;
    previewContainer.style.display = "block";
    preview.style.display = "block";
  }
});

//button for ticket generation
const ticketBtn = document.querySelector(".ticket-btn");
ticketBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const isValid = generateTicket();
    if(!isValid) return;
   
    const fullName = document.getElementById("full-name");
    const emailAddress = document.getElementById("email");

    localStorage.setItem("userName", fullName.value.trim());
    localStorage.setItem("userEmail", emailAddress.value.trim());

    window.location.href = "ticket.html";
       
});


