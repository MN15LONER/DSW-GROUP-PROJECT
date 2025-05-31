<?php
// reset-password-handler.php

require_once 'db.php';

$token = $_POST['token'] ?? '';
$newPassword = $_POST['new_password'] ?? '';

if (empty($token) || empty($newPassword)) {
    echo "Token and password are required.";
    exit;
}

// 1. Check if token is valid and not expired
$stmt = $pdo->prepare("SELECT email FROM password_resets WHERE token = ? AND expires_at > NOW()");
$stmt->execute([$token]);
$reset = $stmt->fetch();

if (!$reset) {
    echo "<script>alert('Invalid or expired token.'); window.location.href = '..HTML/forgot-password.html';</script>";
    exit;
}

$email = $reset['email'];

// 2. Update the user's password
$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("UPDATE users SET password = ? WHERE email = ?");
$stmt->execute([$hashedPassword, $email]);

// 3. Leave token and expiry as-is

echo <<<HTML
<script>
    alert('Password has been reset successfully.');
    window.location.href = '..HTML/Login.html';
</script>
HTML;
exit;
