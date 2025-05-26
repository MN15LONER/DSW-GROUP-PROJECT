<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

$conn = new mysqli('localhost', 'root', '', 'crime_watch_system');
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$stmt = $conn->prepare("SELECT id, crimeType, crimeDesc, latitude, longitude, reportTime FROM crimereports WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$reports = [];
while ($row = $result->fetch_assoc()) {
    $reports[] = $row;
}

echo json_encode($reports);
$stmt->close();
$conn->close();
