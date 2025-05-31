<?php

require_once 'db.php';

$token = $_POST['token'] ?? '';
$newPassword = $_POST['new_password'] ?? '';

if (empty($token) || empty($newPassword)) {
    echo "Token and password are required.";
    exit;
}

// Lookup user by token
$stmt = $pdo->prepare("SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()");
$stmt->execute([$token]);
$user = $stmt->fetch();

if (!$user) {
    echo "Invalid or expired token.";
    exit;
}

// Hash the new password and update
$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("UPDATE password_resets SET password = ?, token = NULL, expires_at = NULL WHERE id = ?");
$stmt->execute([$hashedPassword, $user['id']]);

echo "Password has been reset successfully.";
