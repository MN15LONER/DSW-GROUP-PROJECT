document.addEventListener("DOMContentLoaded", function() {
            const form = document.getElementById("resetPasswordForm");
            const passwordInput = document.getElementById("new_password");
            const confirmInput = document.getElementById("confirm_password");
            const passwordError = document.getElementById("passwordError");
            const confirmError = document.getElementById("confirmError");
            
            form.addEventListener("submit", function(event) {
                // Clear previous error messages
                passwordError.textContent = "";
                confirmError.textContent = "";
                
                // Validate password
                if (passwordInput.value.length < 8) {
                    passwordError.textContent = "Password must be at least 8 characters long";
                    event.preventDefault();
                    return;
                }
                
                // Validate password confirmation
                if (passwordInput.value !== confirmInput.value) {
                    confirmError.textContent = "Passwords do not match";
                    event.preventDefault();
                    return;
                }
            });
        });