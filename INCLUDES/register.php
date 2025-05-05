<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullname = trim($_POST['fullname']);
    $lastname = trim($_POST['lastname']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Checking if the passwords match
    if ($password !== $confirm_password) {
        echo json_encode(['status' => 'error', 'message' => 'Passwords do not match']);
        exit;
    }

    // Checking if the email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Email already exists']);
        exit;
    }

    // Hashing the password here
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Inserting a new user into the databse right here 
    $stmt = $pdo->prepare("INSERT INTO users (fullname, lastname, email, password) VALUES (?, ?, ?, ?)");

    try {
        $stmt->execute([$fullname, $lastname, $email, $hashedPassword]);
        echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Something went wrong: ' . $e->getMessage()]);
    }
}

