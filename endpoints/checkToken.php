<?php
try {
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input"));

    $token =$data->token;
    $q ="SELECT * FROM users WHERE token='$token'";
    $check = $conn->query($q);
    $check = $check->fetchAll();

    if(count($check) == 1){
        echo "authorized";
    }else {
        echo "unauthorized";
    }
}catch(PDOException $e){
    echo $q . "<br>" . $e->getMessage();
}

 
?>