<?php
header('Content-Type: application/json');
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    exit;
}

$email = $_POST['email'] ?? '';
if (empty($email)) {
    echo json_encode(['status' => 'error', 'message' => 'Email is required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
    exit;
}

// 1. Check if user exists
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
    exit;
}

// 2. Generate token and expiry
$token = bin2hex(random_bytes(32));
$expiresAt = date("Y-m-d H:i:s", strtotime("+1 hour"));

// 3. Insert or update the password_resets table
$stmt = $pdo->prepare("
    INSERT INTO password_resets (email, token, expires_at)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE token = VALUES(token), expires_at = VALUES(expires_at)
");
$stmt->execute([$email, $token, $expiresAt]);

// 4. Return success and token
echo json_encode([
    'status' => 'success',
    'token' => $token,
    'email' => $email
]);
exit;
