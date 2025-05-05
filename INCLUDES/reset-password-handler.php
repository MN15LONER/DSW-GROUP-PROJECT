<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'];
    $newPassword = $_POST['new_password'];
    $confirmPassword = $_POST['confirm_password'];

    if (empty($token) || empty($newPassword) || empty($confirmPassword)) {
        echo "All fields are required.";
        exit;
    }

    if ($newPassword !== $confirmPassword) {
        echo "Passwords do not match.";
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM password_resets WHERE token = ?");
    $stmt->execute([$token]);
    $resetRequest = $stmt->fetch();

    if (!$resetRequest) {
        echo "Invalid or expired token.";
        exit;
    }

    $expiresAt = strtotime($resetRequest['expires_at']);
    if (time() > $expiresAt) {
        echo "Token has expired.";
        exit;
    }

    $email = $resetRequest['email'];
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("UPDATE users SET password = ?, reset_token = NULL WHERE email = ?");
    $stmt->execute([$hashedPassword, $email]);

    $stmt = $pdo->prepare("DELETE FROM password_resets WHERE token = ?");
    $stmt->execute([$token]);

    echo "Password reset successfully. You can now <a href='../html/login.html'>login</a>.";
} else {
    echo "Invalid request method.";
}