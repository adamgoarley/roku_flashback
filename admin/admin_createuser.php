<?php 
    require_once '../load.php';

    if(isset($_POST['email'])){
        $email = trim($_POST['email']);
        $fname = trim($_POST['firstname']);
        $lname = trim($_POST['lastname']);
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);

        $message = createAccount($email, $fname, $lname, $username, $password);

        echo json_encode($message);
    }