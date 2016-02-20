/* Setup Rounting */
angular.module("WisestGame").config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
    $stateProvider

        // startGame
        .state('startGame', {
            url: "/game/start",
            templateUrl: "modules/game/template/startGame.html",            
            data: {pageTitle: 'Start game'},
            controller: "GameController"
        });

}]);