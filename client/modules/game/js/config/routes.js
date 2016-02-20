/* Setup Rounting */
angular.module("WisestGame").config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // startGame
        .state('startGame', {
            url: "/game/start",
            templateUrl: "modules/game/template/start-menu.html",
            data: {pageTitle: 'Start game'},
            controller: "StartGameController"
        })

         // Play game
        .state('playGame', {
            url: "/game/play",
            templateUrl: "modules/game/template/single-player.html",
            data: {pageTitle: 'Game'},
            controller: "GameController"
        });

}]);