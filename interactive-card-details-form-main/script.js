// Form inputs
const cardName = document.querySelector(".cardholder-name");
const cardNumber = document.querySelector(".card-number");
const expiryMonth = document.querySelector(".exp-month");
const expiryYear = document.querySelector(".exp-year");
const cvc = document.querySelector(".cvc");
const confirmBtn = document.querySelector(".confirm-btn");
const continueBtn = document.querySelector(".continue-btn");

// Preview fields
const cardNameInput = document.getElementById("cardholder-name");
const cardNumberInput = document.getElementById("card-number");
const cardNameDisplay = document.getElementById("card-holder");
const cardNumberDisplay = document.getElementById("card-no");
const expiryDisplay = document.getElementById("cvc-preview");
const backCvcDisplay = document.getElementById("back-cvc");

// Format card number to give spaces after 4 digits
function formatCardNumber(value) {
  return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
}

// Live update for card holder name
cardNameInput.addEventListener('input', (e) => {
  const value = e.target.value || "Odo Chidera Princess";
  cardNameDisplay.textContent = value;
});

// Live update for card number
cardNumberInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/[^0-9]/g, '');

  if (value.length > 0) {
    value = formatCardNumber(value);
    e.target.value = value;
  }

  cardNumberDisplay.textContent = value || '0000 0000 0000 0000';
});

// Live update for expiry month
expiryMonth.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
  updateExpiryDate();
});

// Live update for expiry year
expiryYear.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
  updateExpiryDate();
});

// Expiry MM/YY display
function updateExpiryDate() {
  const mm = expiryMonth.value || '00';
  const yy = expiryYear.value || '00';
  expiryDisplay.textContent = `${mm}/${yy}`;
}

// Live update for CVC
cvc.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
  backCvcDisplay.textContent = e.target.value || '000';
});

// Form validation
function validateForm(e) {
  e.preventDefault();
  let isValid = true;
  
  const cardNameInputValue = cardName.value.trim();
  const cardNumberInputValue = cardNumber.value.trim().replace(/\s/g, '');
  const expiryMonthInput = expiryMonth.value.trim();
  const expiryYearInput = expiryYear.value.trim();
  const cvcInput = cvc.value.trim();
  const regex = /^\d+$/;
  
  const cardNameError = document.getElementById("card-name-error");
  const cardNumberError = document.getElementById("card-number-error");
  const expiryError = document.getElementById("expiry-error");
  const cvcError = document.getElementById("cvc-error");

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;

  // Reset error messages
  cardNumberError.textContent = "";
  expiryError.textContent = "";
  cvcError.textContent = "";
  cardNumber.style.border = "";
  expiryMonth.style.border = "";
  expiryYear.style.border = "";
  cvc.style.border = "";

  // Card name validation
  if(cardNameInputValue === ""){
    cardNameError.textContent = "Can't be blank";
    cardNameError.style.color = "red";
    cardName.style.border = "1px solid red";
  }

  // Card number validation
  if (cardNumberInputValue === "") {
    cardNumberError.textContent = "Can't be blank";
    cardNumberError.style.color = "red";
    cardNumber.style.border = "1px solid red";
    isValid = false;
  } else if (!regex.test(cardNumberInputValue)) {
    cardNumberError.textContent = "Wrong format, numbers only";
    cardNumberError.style.color = "red";
    cardNumber.style.border = "1px solid red";
    isValid = false;
  }

  // Expiry month validation
  if (expiryMonthInput === "") {
    expiryError.textContent = "Can't be blank";
    expiryError.style.color = "red";
    expiryMonth.style.border = "1px solid red";
    isValid = false;
  } else if(!regex.test(expiryMonthInput) || Number(expiryMonthInput) < 1 || Number(expiryMonthInput) > 12){
    expiryError.textContent = "Invalid month (must be 01 to 12)";
    expiryError.style.color = "red";
    expiryMonth.style.border = "1px solid red";
    isValid = false;
  }

  // Expiry year validation
  if (expiryYearInput === "") {
    expiryError.style.color = "red";
    expiryYear.style.border = "1px solid red";
    isValid = false;
  } else if(!regex.test(expiryYearInput) || Number(expiryYearInput) < currentYear){
    expiryError.textContent = "Card has expired";
    expiryError.style.color = "red";
    expiryYear.style.border = "1px solid red";
    isValid = false;
  } else if (Number(expiryYearInput) === currentYear && Number(expiryMonthInput) < currentMonth) {
    expiryError.textContent = "Card has expired";
    expiryError.style.color = "red";
    expiryMonth.style.border = "1px solid red";
    expiryYear.style.border = "1px solid red";
    isValid = false;
}

  // CVC validation
  if (cvcInput === "") {
    cvcError.textContent = "Can't be blank";
    cvcError.style.color = "red";
    cvc.style.border = "1px solid red";
    isValid = false;
  }

  // Validation complete and true
  if(isValid){
    const formSection = document.querySelector('.form-section');
    const completeSection = document.querySelector('.complete-section');
    //hide form and show complete section
    formSection.style.display = "none";
    completeSection.style.display = "block";
  }

}

function resetForm() {
  // Clear input fields to reset form
  cardNameInput.value = "";
  cardNumberInput.value = "";
  expiryMonth.value = "";
  expiryYear.value = "";
  cvc.value = "";

  // Reset preview values
  cardNameDisplay.textContent = "Odo Chidera Princess";
  cardNumberDisplay.textContent = "0000 0000 0000 0000";
  expiryDisplay.textContent = "00/00";
  backCvcDisplay.textContent = "000";

  // Clear error messages and borders
  document.getElementById("card-number-error").textContent = "";
  document.getElementById("expiry-error").textContent = "";
  document.getElementById("cvc-error").textContent = "";

  cardNumber.style.border = "";
  expiryMonth.style.border = "";
  expiryYear.style.border = "";
  cvc.style.border = "";

  // Show form and hide complete section
  document.querySelector(".form-section").style.display = "block";
  document.querySelector(".complete-section").style.display = "none";
}

confirmBtn.addEventListener("click", validateForm);
continueBtn.addEventListener('click', resetForm);

