<?php
try{
        include("../connection.php");
        $data =json_decode(file_get_contents("php://input"));
        $nameError = $username = $password = "";

        // if(empty($data->username) || empty($data->password))
        // {
        //     echo "User and Password are required";
        // }else
        // {

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
                if (empty($data->username)) {
                    $nameError = "User is required";
                }else{
                    if (!filter_var($data->username, FILTER_VALIDATE_EMAIL)) {
                        $nameError = "Invalid email format"; 
                    }else{

                        if (empty($data->password)) {
                            $nameError = "Password is required";
                        }else{
                            if (!preg_match("/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/",$data->password)) {
                                $nameError = "Invalid password format"; 
                            }else{                                                        
                                $username=test_input($data->username);
                                //$password=sha1( $data->password);
                            }            
                        }
                    }
                }
        }    

        if(!empty($nameError)){
            echo json_encode($nameError); 
        }else{

            $q ="SELECT email FROM users WHERE email='$username'" ;
            $userInfo = $conn->query($q);
            $userInfo = $userInfo->fetchAll();  
            
            if(count($userInfo) == 0){

                //$username = $data->username;
                $password = sha1($data->password);
                $token = $username . " | " . uniqid() . uniqid() . uniqid();;

                $q = "INSERT INTO users(email, password, token) VALUES (:email, :password, :token)";
                $query = $conn->prepare($q); 
                $execute = $query->execute(array(
                    ":email" => $username,
                    ":password" => $password,
                    ":token" =>  $token
                ));

                $result = array('username'=>$username,'token'=>$token);
                echo json_encode($result);
            }else{
                echo json_encode("User already taken"); 
            }  
        }
        // }
}catch(PDOException $e){
        echo "Error: " . $e->getMessage();
}  
$conn = null;

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>