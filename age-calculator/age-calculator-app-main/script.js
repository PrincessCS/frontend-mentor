function checkAge(){
    //getting current day, month, and year
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1; // months are 0 indexed in JS
    const validMonths = 12;
    const currentDay = date.getDate();

    let isValid = true;

    //getting elements
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");
    const dayResult = document.querySelector(".age-days");
    const monthResult = document.querySelector(".age-months");
    const yearResult = document.querySelector(".age-years");
    const dayError = document.getElementById("day-error");
    const monthError = document.getElementById("month-error");
    const yearError = document.getElementById("year-error");
    const labels = document.querySelectorAll(".labels");

    //getting input values (always expect a number)
    const dayInputValue = parseInt(dayInput.value.trim());
    const monthInputValue = parseInt(monthInput.value.trim());
    const yearInputValue = parseInt(yearInput.value.trim());
    
    //checking if input fields are empty and is not a number
    if(isNaN(dayInputValue) || isNaN(monthInputValue) || isNaN(yearInputValue)){
        dayError.textContent = "This field is required";
        monthError.textContent = "This field is required";
        yearError.textContent = "This field is required";
        labels.forEach(label => label.style.color = "red");
        dayInput.classList.add("error-outline");
        monthInput.classList.add("error-outline");
        yearInput.classList.add("error-outline");
        isValid = false;
    } else{
        isValid = true;
        dayError.textContent = "";
        monthError.textContent = "";
        yearError.textContent = "";
        labels.forEach(label => label.style.color = "grey");
        dayInput.classList.remove("error-outline");
        monthInput.classList.remove("error-outline");
        yearInput.classList.remove("error-outline");
    }

    //checking if day is valid for the month
    const validDay = new Date(yearInputValue, monthInputValue, 0).getDate();
    if(dayInputValue < 1 || dayInputValue > validDay){
        dayError.textContent = "Must be a valid day";
        isValid = false;
    }
   

    //checking if month is valid
    if(monthInputValue < 1 || monthInputValue > validMonths){
        monthError.textContent = "Must be a valid month";
        isValid = false;      
    }
    
    //checking if the year input is in the future
    if(yearInputValue < 1000 || yearInputValue > currentYear){
        yearError.textContent = "Must be in the past";
        isValid = false;
    }

    // result if everything is invalid
    if(!isValid){
        yearResult.textContent = "";
        monthResult.textContent = "";
        dayResult.textContent = "";
        return;   
    }
     
    //calculation 
    let calcYear = currentYear - yearInputValue;
    let calcMonth = monthInputValue - currentMonth;
    let calcDay = dayInputValue - currentDay;
    
    //preventing negative values
    if (calcDay < 0) {
        calcMonth--;
        const prevMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();
        calcDay += prevMonthDays;
    }

    if (calcMonth < 0) {
        calcYear--;
        calcMonth += 12;
    }

    yearResult.textContent = calcYear;
    monthResult.textContent = calcMonth;
    dayResult.textContent = calcDay;

    dayInput.value = "";
    monthInput.value = "";
    yearInput.value = "";
}

const resultBtn = document.querySelector(".result-btn");
resultBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkAge();
})

