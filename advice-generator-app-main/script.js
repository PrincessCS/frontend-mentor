const button = document.getElementById("advice-btn");
const advice = document.getElementById("advice");
const adviceNumber = document.getElementById("advice-number");
function getAdvice(){
    fetch("https://api.adviceslip.com/advice")
    .then(response => response.json())
    .then(data => {
        adviceNumber.textContent = `#${data.slip.id}`;
        advice.textContent = `"${data.slip.advice}"`;
        document.title = `Advice #${data.slip.id}`;
    }   
    )
    .catch(err => {
      advice.textContent = "Sorry, we couldn't load advice. Please try again.";
      console.error("Error loading data:", err);
    });
}
button.addEventListener("click", getAdvice);
getAdvice();