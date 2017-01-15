(function () {
    'use strict';

    app.directive('toolbar', toolbar);
    function toolbar() {
        return {
            templateUrl: "views/toolbar.html",
            controller: toolbarController,
            controllerAs: 'toolbar'
        }
    }


    function toolbarController($scope, $http, $state, AuthenticationService, $rootScope) {
        //Variable to show or hide the button login and logout from the tollbar
        $scope.isAuthenticated = true;

        //check if user is logged then show the logIn or LogOut depends of the data response
        AuthenticationService.checkToken(function (userConfirmed) {
            //set the user name in the taskbar
           
            $scope.isAuthenticated = userConfirmed;
        });

        if (localStorage['userName'] == null)
            $scope.profile = "User";
        else
            $scope.profile = localStorage['userName'];

        //*********************this shows the login Modal***********************
        $scope.login = function () {
            $("#myModal").modal("show");

            //set the event for listen when the submit button is press in the Modal
            $rootScope.$on("afterLogin", function (event, data) {

                $scope.profile = data;
                //check if user is logged then show the logIn or LogOut depends of the data response
                AuthenticationService.checkToken(function (userConfirmed) {
                    $scope.isAuthenticated = userConfirmed;
                });

            });

        };

        //********************* this Logout the User*************************
        $scope.logout = function () {

            var token;
            if (localStorage['token']) {
                token = localStorage['token'];
            } else {
                token = "Something";
            }

            var data = { token: token };

            $http.post('endpoints/logout.php', data).success(function (response) {
                localStorage.clear();
                $state.go("login");
                $scope.profile = "User";

                //check if user is logged then show the logIn or LogOut depends of the data response
                AuthenticationService.checkToken(function (data) {
                    $scope.isAuthenticated = data;
                });

            }).error(function (error) {
                console.error(error);
            });
        }


    }
})();