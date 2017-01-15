<?php
try{
    include("../connection.php");
    $data = json_decode(file_get_contents("php://input"));
    $nameError = $username = $password = $token = "";
    // if(empty($data->username) || empty($data->password)){
    //     echo json_encode("User and Password are required");
    // }else{
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
                            $password=sha1( $data->password);
                        }            
                    }
                }
            }
        }      

        if(!empty($nameError)){
            //$result = array('errorMessage'=>$nameError,'token'=>$token);
            echo json_encode($nameError); 
            //echo json_encode("nameError"); 
           //echo json_encode($result);
        }else{
            $q ="SELECT email FROM users WHERE email='$username' AND password='$password'" ;

            $userInfo = $conn->query($q);
            $userInfo = $userInfo->fetchAll();            
            //$token;

            if(count($userInfo) == 1){
                $token = $username . " | " . uniqid() . uniqid() . uniqid(); 

                $q="UPDATE users SET token=:token WHERE email=:email AND password=:password ";
                $query =$conn-> prepare($q);
                $execute = $query->execute(array(
                    ":email" => $username,
                    ":password" => $password,
                    ":token" => $token
                ));
                //echo json_encode($token);
                 $result = array('username'=>$username,'token'=>$token);
                 echo json_encode($result);
            }else{
                echo json_encode("Wrong Email or password"); 
            }  
        }
  
   // }
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