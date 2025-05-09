
const submitBtn = document.getElementById("submit-btn");

function formValidation(){
    //getting elements
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const emailAddress = document.getElementById("email");
    const message = document.getElementById("message");
    const checkBox = document.getElementById("consent");
    const selectedRadioValue = document.querySelector('input[name="query"]:checked');

    //regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    //getting values of input
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = emailAddress.value.trim();
    const messageValue = message.value.trim();
    const checkBoxValue = checkBox.checked;


    //getting error elements
     const firstNameError = document.getElementById("first-name-error");
     const lastNameError = document.getElementById("last-name-error");
     const messageError = document.getElementById("message-error");
     const emailError = document.getElementById("email-error");
     const checkBoxError = document.getElementById("consent-error");
     const radioError = document.getElementById("radio-error");
     let isValid = true;
    
    //checking if input is empty
    if(firstNameValue === ""){
        firstNameError.textContent = "This field is required!";
        isValid = false;
    } else{
        firstNameError.textContent = "";
    }

    if(lastNameValue === ""){
         lastNameError.textContent = "This field is required!";
         isValid = false;     
    } else{
        lastNameError.textContent = "";
    }

    if(messageValue === ""){
        messageError.textContent = "This field is required";
        isValid = false;
    } else{
        messageError.textContent = "";
    }

    if(emailValue === ""){
        emailError.textContent = "This field is required!";
        isValid = false;
    }else{
        emailError.textContent = "";
    }

    if(!emailPattern.test(emailValue)){
        emailError.textContent = "Please enter a valid email address";
        isValid = false;
    }else{
        emailError.textContent = "";
    }

    if(selectedRadioValue){
        radioError.textContent = "";
    }else{
        radioError.textContent = " Please select a query type";
        isValid = false;
    }

    if(checkBoxValue){
       checkBoxError.textContent = "";
      
    }else{
         checkBoxError.textContent = "To submit this form, please consent to being contacted";
          isValid = false;
        
    }

    if(isValid){
        //modal
        const successModal = document.getElementById("success-modal");
        const closeModal = document.getElementById("close-btn");
        successModal.style.display = "flex";

        closeModal.addEventListener("click", ()=> {
            successModal.style.display = "none";
        })
         
        console.table({
            FirstName: firstNameValue,
            LastName: lastNameValue,
            Email: emailValue,
            SelectedRadio: selectedRadioValue,
            Message: messageValue          
        });

       //clear input fields after submission
       firstName.value = ""; 
       lastName.value = "";
       emailAddress.value = "";
       message.value = ""
       checkBox.checked = false;
       const radioBtn = document.querySelectorAll('input[name="query"]');
       radioBtn.forEach(radio => radio.checked = false);


    } else{
        "Please fill out all fields!"
    }  
       
    
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formValidation();
})