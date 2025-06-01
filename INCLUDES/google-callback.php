<?php
session_start();
require_once 'db.php';

if (isset($_GET['code'])) {
    $code = $_GET['code'];

    // Communicating with google with the api
    $token_url = 'https://oauth2.googleapis.com/token';
    //Preparing the information google is going to need in order to login
    $data = [
        'code' => $code,
        'client_id' => '701617346023-nl0130bnic6jtt20482h6suc07vr0j6r.apps.googleusercontent.com',
        'client_secret' => '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',
        'redirect_uri' => 'http://localhost/DSW_PROJECT/includes/google-callback.php',
        'grant_type' => 'authorization_code'
    ];

    //Building a query from the data 
    $options = [
        'http' => [
            'header'  => "Content-Type: application/x-www-form-urlencoded",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ]
    ];
    $context  = stream_context_create($options);
    $response = file_get_contents($token_url, false, $context);
    $tokenData = json_decode($response, true);
    //Checking if the token was retrieved
    if (isset($tokenData['access_token'])) {
        $accessToken = $tokenData['access_token'];
        $userInfo = file_get_contents("https://www.googleapis.com/oauth2/v1/userinfo?access_token=$accessToken");
        $user = json_decode($userInfo, true);
        //Getting the users name and email from the db
        $email = $user['email'];
        $name = $user['name'];
        //Preping to create the query
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $existingUser = $stmt->fetch();
        //Checking if the user exists
        if (!$existingUser) {
            $stmt = $pdo->prepare("INSERT INTO users (fullname, email, password) VALUES (?, ?, '')");
            $stmt->execute([$name, $email]);
            $userId = $pdo->lastInsertId();
        } else {
            $userId = $existingUser['id'];
        }
        //After login taking the user back to the home page
        $_SESSION['user_id'] = $userId;
        header("Location: ../html/home.html");
        exit;
    } else {
        echo "Failed to get access token.";
    }
} else {
    echo "No code returned from Google.";
}
