document.addEventListener("DOMContentLoaded", function () {
     emailjs.init("ZfrdBBrSpcFvuZ7jc"); // Replace with your actual public key
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
              if (email === "neighbourguard@gmail.com"){
                window.location.href = "../HTML/adminLog.html";
              }
              else{
                window.location.href = "../HTML/Home.html"; // Redirecting the user to the login page if their login is successfull
              } 
          } else {
              alert(data.message); 
          }
      })
      .catch(error => {
          console.error("Error:", error);
          alert("Something went wrong. Please try again.");
      });
  });

  //Panick button functionality   
  document.getElementById("panicButton").addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Optional: save to your DB
      fetch("../INCLUDES/submit_panic.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `latitude=${lat}&longitude=${lng}`
      });

      // Send email
      emailjs.send("service_6i0o1z3", "template_0zsa33d", {
        lat: lat,
        lng: lng
      }).then(() => {
        alert("Our security team has been alerted and are on their way.");
      }).catch((error) => {
        console.error("Email send failed:", error);
        alert("Could not alert security team.");
      });
    }, (err) => {
      alert("Could not get your location.");
    });
  });
});
 

