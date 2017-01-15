app.service('AuthenticationService', ["$http", "$state", function ($http, $state) {
    var self = this;
    self.checkToken = function (validUser) {

        var token;
        if (localStorage['token']) {
            token = localStorage['token'];
        } else {
            token = "Something";
        }

        var data = { token: token };


        $http.post("endpoints/checkToken.php", data).success(function (response) {

            if (response === "unauthorized") {

                $state.go("login");
                validUser(false);
            } else {

                validUser(true);
            }

        }).error(function (error) {

            $state.go("login");
            validUser(false);
        })

    }
}]);
