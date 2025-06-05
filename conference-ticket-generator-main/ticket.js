document.addEventListener("DOMContentLoaded", ()=>{
    const userName = localStorage.getItem("userName");
    const emailAddress = localStorage.getItem("userEmail");
    const userImage = localStorage.getItem("userImage");

    if(userName && emailAddress && userImage){
      const getName =  document.querySelectorAll(".user-name");
      const getEmail =  document.querySelectorAll(".email-address");
      const getImage = document.getElementById("image")
      getName.forEach(name => name.textContent = userName);
      getEmail.forEach(email => email.textContent = emailAddress );
      getImage.src = userImage;

    }else{
        console.log("No user data found");
    }
})