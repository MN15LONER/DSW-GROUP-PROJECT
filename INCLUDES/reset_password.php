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
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
      background: #f4f7f8;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }
    h2 {
      text-align: center;
      color: #333;
    }
    label {
      display: block;
      margin-top: 1rem;
      color: #555;
    }
    input[type="password"] {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.25rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      margin-top: 1.5rem;
      width: 100%;
      padding: 0.75rem;
      background: #007bff;
      border: none;
      font-size: 1rem;
      color: white;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.3s ease;
    }
    button:hover {
      background: #0056b3;
    }
    .message {
      margin-top: 1rem;
      padding: 0.75rem;
      border-radius: 4px;
      display: none;
    }
    .message.success {
      background-color: #d4edda;
      color: #155724;
    }
    .message.error {
      background-color:rgb(51, 23, 25);
      color: #721c24;
    }
  </style>
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
