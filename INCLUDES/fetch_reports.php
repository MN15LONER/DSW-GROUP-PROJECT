<?php
header('Content-Type: application/json');
session_start();

//connection to the MySQL
$conn = new mysqli('localhost', 'root', '', 'crime_watch_system');
if ($conn->connect_error) {
  echo json_encode(['error' => 'Database connection failed']);
  exit;
}

//Fetching crime reports along with the reporter's name
$sql = "SELECT users.fullname, users.lastname, crimereports.crimeType, crimereports.crimeDesc, crimereports.latitude, crimereports.longitude, crimereports.reportTime FROM crimereports INNER JOIN users ON crimereports.user_id = users.id";
$result = $conn->query($sql);

$formattedReports = [];
//Checking if there are any results
if ($result && $result->num_rows > 0) {
  // Looping through each row and format the report data
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
