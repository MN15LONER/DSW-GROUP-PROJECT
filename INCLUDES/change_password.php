<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $current = $_POST['current'] ?? '';
    $new = $_POST['new'] ?? '';
    $confirm = $_POST['confirm'] ?? '';

    if (empty($current) || empty($new) || empty($confirm)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }

    if (strlen($new) < 8) {
        echo json_encode(['success' => false, 'message' => 'New password must be at least 8 characters']);
        exit;
    }

    if ($new !== $confirm) {
        echo json_encode(['success' => false, 'message' => 'New passwords do not match']);
        exit;
    }

    $conn = new mysqli('localhost', 'root', '', 'crime_watch_system');
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'DB connection failed']);
        exit;
    }

    $stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->bind_result($hashed);
    $stmt->fetch();
    $stmt->close();

    if (!password_verify($current, $hashed)) {
        echo json_encode(['success' => false, 'message' => 'Current password is incorrect']);
        exit;
    }

    $new_hashed = password_hash($new, PASSWORD_DEFAULT);
    $update = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
    $update->bind_param("si", $new_hashed, $user_id);

    if ($update->execute()) {
        echo json_encode(['success' => true, 'message' => 'Password updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update password']);
    }

    $update->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
