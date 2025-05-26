<?php
header('Content-Type: application/json');
require 'db.php';  

try {
    $adminReports = [];

    // Get panic reports
    $panicStmt = $pdo->prepare("SELECT id, latitude, longitude, reportTime FROM panicreports");
    $panicStmt->execute();
    while ($row = $panicStmt->fetch()) {
        $row['type'] = 'urgent';
        $row['crimeType'] = 'Emergency';

        $adminReports[] = $row;
    }

    // Get regular reports
    $normalStmt = $pdo->prepare("SELECT id, crimeType, crimeDesc, latitude, longitude, reportTime FROM crimereports");
    $normalStmt->execute();
    while ($row = $normalStmt->fetch()) {
        $row['type'] = 'pending';

        $adminReports[] = $row;
    }

    echo json_encode($adminReports);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}