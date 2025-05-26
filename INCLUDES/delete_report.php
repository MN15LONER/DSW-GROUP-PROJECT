<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $report_id = $_POST['report_id'] ?? null;

    if (!$report_id) {
        echo json_encode(['success' => false, 'message' => 'No report ID provided']);
        exit;
    }

    try {
        $conn = new mysqli('localhost', 'root', '', 'crime_watch_system');
        if ($conn->connect_error) {
            throw new Exception("DB connection failed: " . $conn->connect_error);
        }

        // Make sure the report belongs to the user
        $check = $conn->prepare("SELECT * FROM crimereports WHERE id = ? AND user_id = ?");
        $check->bind_param("ii", $report_id, $user_id);
        $check->execute();
        $result = $check->get_result();

        if ($result->num_rows === 0) {
            echo json_encode(['success' => false, 'message' => 'Report not found or unauthorized']);
            exit;
        }

        // Delete the report
        $stmt = $conn->prepare("DELETE FROM crimereports WHERE id = ? AND user_id = ?");
        $stmt->bind_param("ii", $report_id, $user_id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Report deleted']);
        } else {
            throw new Exception("Delete failed: " . $stmt->error);
        }

        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
