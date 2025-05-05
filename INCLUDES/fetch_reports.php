<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'localhost';
$db = 'crime_watch_system';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    error_log("Database connection successful");
} catch (PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

try {
    $stmt = $pdo->query('SELECT crimeType, crimeDesc, latitude, longitude, reportTime, mediaPath FROM crimereports ORDER BY reportTime DESC');
    $reports = $stmt->fetchAll();
    
    error_log("Found " . count($reports) . " reports");
    
    $formattedReports = [];
    foreach ($reports as $report) {
        $formattedReport = [
            'crimeType' => $report['crimeType'],
            'crimeDesc' => $report['crimeDesc'],
            'latitude' => (float)$report['latitude'],
            'longitude' => (float)$report['longitude'],
            'reportTime' => $report['reportTime'],
            'mediaPath' => $report['mediaPath'],
            'message' => $report['crimeType'] . ': ' . $report['crimeDesc'] . ' (Reported on ' . date('d/m/Y', strtotime($report['reportTime'])) . ')'
        ];
        $formattedReports[] = $formattedReport;
    }
    
    echo json_encode($formattedReports);
} catch (PDOException $e) {
    error_log("Failed to fetch reports: " . $e->getMessage());
    echo json_encode(['error' => 'Failed to fetch reports: ' . $e->getMessage()]);
}