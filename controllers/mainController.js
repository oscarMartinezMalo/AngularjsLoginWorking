app.controller("MainController", function ($scope,$state, $http, AuthenticationService){
 var token ;
 if(localStorage['token']){
     token = localStorage['token'];     
 }else{
     token = "Something";
 }

   // AuthenticationService.checkToken(token);
    AuthenticationService.checkToken(function (userConfirmed) {
            //set the user name in the taskbar
           
            $scope.isAuthenticated = userConfirmed;
        });
    $scope.logout = function(){
        var data = {
            token: token
        }        

        $http.post('endpoints/logout.php',data).success(function(response){
            localStorage.clear();
            $state.go("login");
        }).error(function(error){
            console.error(error);
        });
    }
})

