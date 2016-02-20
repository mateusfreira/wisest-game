/* Setup Rounting */
angular.module("WisestGame").config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // Dashboard
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "modules/dashboard/template/dashboard.html",
            data: {pageTitle: 'Dashboard'},
            controller: "DashboardController"
        });

}]);