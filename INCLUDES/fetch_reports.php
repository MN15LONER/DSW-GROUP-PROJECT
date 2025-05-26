<?php
header('Content-Type: application/json');
session_start();

$conn = new mysqli('localhost', 'root', '', 'crime_watch_system');
if ($conn->connect_error) {
  echo json_encode(['error' => 'Database connection failed']);
  exit;
}

$sql = "SELECT users.fullname, users.lastname, crimereports.crimeType, crimereports.crimeDesc, crimereports.latitude, crimereports.longitude, crimereports.reportTime FROM crimereports INNER JOIN users ON crimereports.user_id = users.id";
$result = $conn->query($sql);

$formattedReports = [];

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $formattedReports[] = [
      'fullname' => $row['fullname'],
      'lastname' => $row['lastname'],
      'crimeType' => $row['crimeType'],
      'crimeDesc' => $row['crimeDesc'],
      'latitude' => $row['latitude'],
      'longitude' => $row['longitude'],
      'reportTime' => $row['reportTime']
    ];
  }
}

echo json_encode($formattedReports);
$conn->close();
