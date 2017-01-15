var app = angular.module("UserAuthTutorial", ["ui.router", "ngMessages"]);


// This send you to the different states 
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state("login", {
      url: "/",
      controller: "LoginController",
      templateUrl: "views/login.html"
    })

    .state("application", {
      url: "/app",
      controller: "MainController",
      templateUrl: "views/application.html",
      params: { 'test': null }
    })

    .state("admin", {
      url: "/products",
      controller: "MainController",
      templateUrl: "views/products.html",
      params: { 'test': null }
    })

}]);



// this do the Login and Logout
app.controller('mainController', function ($scope, $state, $http, AuthenticationService) {

  // //this shows the login Modal
  // $scope.login = function () {
  //   $("#myModal").modal("show");
  // };

  // var token;
  // if (localStorage['token']) {
  //   token = localStorage['token'];
  // } else {
  //   token = "Something";
  // }

  // AuthenticationService.checkToken(token);
 
  // // this Logout the User
  // $scope.logout = function () {
  //   var data = {
  //     token: token
  //   }

  //   $http.post('endpoints/logout.php', data).success(function (response) {
  //     localStorage.clear();
  //     $state.go("login");
  //   }).error(function (error) {
  //     console.error(error);
  //   });
  // };

});


// Directive to check is the email fields are equals
var compareTo = function () {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo"
    },
    link: function (scope, element, attr, ngModel) {

      ngModel.$validators.compareTo = function (modelValue) {
        return modelValue == scope.otherModelValue;
      };

      scope.$watch("otherModelValue", function () {
        ngModel.$validate();
      });
    }
  };
};
app.directive("compareTo", compareTo);


// Directive to set the email correct format 
app.directive('overwriteEmail', function () {
  var EMAIL_REGEXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  return {
    require: 'ngModel',
    link: function (scope, element, attr, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function (modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
});

//directive to focus the input modal when its open
app.directive('focusMe', function ($timeout, $parse) {
  return {
    link: function (scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function (value) {
        console.log('value=', value);
        if (value === true) {
          $timeout(function () {
            alert(element[0]);
            element[0].focus();
          });
        }
      });
      element.bind('blur', function () {
        console.log('blur')
        scope.$apply(model.assign(scope, false));
      })
    }
  };
});


