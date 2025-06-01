<?php
header('Content-Type: application/json');


// Check if latitude and longitude are provided
$lat = $_POST['latitude'] ?? null;
$lng = $_POST['longitude'] ?? null;

if (!$lat || !$lng) {
    echo json_encode(['success' => false, 'message' => 'Missing coordinates']);
    exit;
}

// Connect to the database
$conn = new mysqli('localhost', 'root', '', 'crime_watch_system');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'DB connection failed']);
    exit;
}

// Prepare and insert panic report
$stmt = $conn->prepare("INSERT INTO panicreports (latitude, longitude) VALUES (?, ?)");
$stmt->bind_param("dd", $lat, $lng);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Panic report saved']);
} else {
    echo json_encode(['success' => false, 'message' => 'Insert failed']);
}

$stmt->close();
$conn->close();
