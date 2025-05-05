document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("validateForm");

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      fetch("../INCLUDES/login.php", {
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === "success") {
              alert("Login successful!");
              window.location.href = "../HTML/Home.html"; // Redirecting the user to the login page if their login is successfull 
          } else {
              alert(data.message); 
          }
      })
      .catch(error => {
          console.error("Error:", error);
          alert("Something went wrong. Please try again.");
      });
  });
});
