<?php
session_start();
header('Content-Type: application/json');

// Check if the user is logged in with a session
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

// Connecting to the MySQL database

$conn = new mysqli('localhost', 'root', '', 'crime_watch_system');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'DB connection failed']);
    exit;
}
//Getting the user id from the session
$user_id = $_SESSION['user_id'];
//Querying the db
$stmt = $conn->prepare("SELECT fullname, email FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

//Here im checking if the user was found
if ($user) {
    echo json_encode([
        'success' => true,
        'fullname' => $user['fullname'],
        'email' => $user['email']
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'User not found']);
}

$stmt->close();
$conn->close();
