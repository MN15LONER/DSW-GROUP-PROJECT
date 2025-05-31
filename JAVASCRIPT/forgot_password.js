document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    const formData = new FormData();
    formData.append('email', email);

    fetch('../INCLUDES/forgot_password.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const templateParams = {
                link: `http://localhost/DSW_PROJECT/INCLUDES/reset_password.php?token=${data.token}`,
                resetLink: `http://localhost/DSW_PROJECT/INCLUDES/reset_password.php?token=${data.token}`,
                email: data.email
            };

            return emailjs.send('service_9qbj9li', 'template_q3ks3fl', templateParams);
        } else {
            throw new Error(data.message);
        }
    })
    .then(() => {
        alert('Email sent.');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed: ' + error.message);
    });
});
