document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("validateForm");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");
    const pswNotmatch = document.getElementById("passwordError");

    form.addEventListener("submit", function (event) {
        if (password.value !== confirmPassword.value) {
            event.preventDefault();
            pswNotmatch.style.display = "block";
        }
    });
});

