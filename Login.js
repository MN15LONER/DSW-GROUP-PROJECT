document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("validateForm");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
  
      let emailCheck = "awe@gmail.com";
      if (email.toLowerCase() === emailCheck) {
  
        let passwordCheck = "12345";
        if (password.toLowerCase() === passwordCheck) {
  
          alert(`Your email: ${email}
          Your password: ${password}`);
          window.location.href = "LocationSafety.html";
        } else {
          alert("Invalid password");

        }
  
      } else {
        alert("Invalid email");

      }
    });
  });
  