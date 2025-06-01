<?php

if (!isset($_GET['token'])) {
    die('Invalid password reset link.');
}
$token = htmlspecialchars($_GET['token']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Reset Password</title>
  <link rel="stylesheet" href="../CSS/reset_password.css">
</head>
<body>
  <h2>Reset Password</h2>
  <form id="resetPasswordForm" method="POST" action="../INCLUDES/reset-password-handler.php">
    <input type="hidden" name="token" value="<?php echo htmlspecialchars($_GET['token']); ?>">
    <label for="new_password">New Password:</label>
    <input type="password" id="new_password" name="new_password" required />
    <label for="confirm_password">Confirm Password:</label>
    <input type="password" id="confirm_password" name="confirm_password" required />
    <button type="submit">Reset Password</button>
  </form>
  <div id="message" class="message"></div>

  <script src="../JAVASCRIPT/reset_password.js"></script>
</body>
</html>
