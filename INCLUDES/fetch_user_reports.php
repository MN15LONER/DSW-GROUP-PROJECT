<?php
session_start();
header('Content-Type: application/json');

//Checking if the user is logged in and if they have a user id
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}
//setting the id in a variable
$user_id = $_SESSION['user_id'];

//Connecting to the db
$conn = new mysqli('localhost', 'root', '', 'crime_watch_system');
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
//Preparing a query to the db
$stmt = $conn->prepare("SELECT id, crimeType, crimeDesc, latitude, longitude, reportTime FROM crimereports WHERE user_id = ?");
//Binding the user id as an int
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

//Array that is going to store the user reports
$reports = [];
//Looping through the rows and adding it to the reports array
while ($row = $result->fetch_assoc()) {
    $reports[] = $row;
}

echo json_encode($reports);
$stmt->close();
$conn->close();
