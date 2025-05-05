<?php
require_once 'db.php'; 
//echo "you are in the login.php page";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Geting the inputs values safely
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // this is the SQL query thats going to find the user by their email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        // Verify the hashed password cuz the psw is hashed on the db side
        if (password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['id']; 

            // If all is good sending the user back to the home page
            echo json_encode(['status' => 'success', 'message' => 'Login successful']);
            exit();
        } 
        else 
        {
            echo json_encode(['status' => 'error', 'message' => 'Invalid password']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'User not found']);
    }
}
