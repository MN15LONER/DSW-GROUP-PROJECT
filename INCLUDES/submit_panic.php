<?php
//Starting the user session
session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}
$user_id = $_SESSION['user_id'];
header('Content-Type: application/json');
// Checking if the form was submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // getting the report here 
    $crimeType = $_POST['crimeType'] ?? '';
    $crimeDesc = $_POST['crimeDesc'] ?? '';
    $latitude = $_POST['latitude'] ?? 0;
    $longitude = $_POST['longitude'] ?? 0;
    // For debugging
    error_log("Data received: Type=$crimeType, Desc=$crimeDesc, Lat=$latitude, Long=$longitude");
    // Validating inputs if theres any empty values 
    if (empty($crimeType) || empty($crimeDesc) || empty($latitude) || empty($longitude)) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit;
    }
    try {
        // Connecting to the database here the db doesnt have a psw it complicates things
        $conn = new mysqli('localhost', 'root', '', 'crime_watch_system');
        if ($conn->connect_error) {
            throw new Exception("Database connection failed: " . $conn->connect_error);
        }
        $stmt = $conn->prepare("INSERT INTO crimereports (user_id, crimeType, crimeDesc, latitude, longitude) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
    throw new Exception("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("issdd", $user_id, $crimeType, $crimeDesc, $latitude, $longitude);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Report submitted successfully!']);
        } else {
            throw new Exception("Execute failed: " . $stmt->error);
        }
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        error_log("Error in submit_report.php: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}