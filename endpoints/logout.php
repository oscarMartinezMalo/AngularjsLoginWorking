<?php
include("../connection.php");

try{
    $data = json_decode(file_get_contents("php://input"));
    $token = $data->token;

    $q = "UPDATE users SET token='LOGGED OUT' WHERE token='$token'";
    // I used exec insted of query 'cause no results are returned'
    $conn->exec($q); 
    echo "Logged out successfully";

}catch(PDOException $e){
    echo $q . "<br>" . $e->getMessage();
}

$conn = null;

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>