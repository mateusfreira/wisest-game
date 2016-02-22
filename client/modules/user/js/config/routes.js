/* Setup Rounting */
angular.module("WisestGame").config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // Profile
        .state('profile', {
            url: "/user/profile",
            templateUrl: "modules/user/template/profile.html",
            data: {pageTitle: 'Profile'},
            controller: "ProfileController"
        })

        // User
        .state('signup', {
            url: "/user/signup",
            templateUrl: "modules/user/template/signup.html",
            data: {pageTitle: 'Sign Up'},
            controller: "SignupController"
        })

        .state('login', {
            url: "/user/login",
            templateUrl: "modules/user/template/login.html",
            data: {pageTitle: 'Login'},
            controller: "LoginController"
        })

        .state('forgot', {
            url: "/user/forgot",
            templateUrl: "modules/user/template/forgot.html",
            data: {pageTitle: 'Recover password'},
            controller: "LoginController"
        });

}]);