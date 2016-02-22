/* Setup Rounting */
angular.module("WisestGame").config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // startGame
        .state('startGame', {
            url: "/game/start",
            templateUrl: "modules/game/template/start-menu.html",
            data: {pageTitle: 'Start game'}
        })

         // Single player
        .state('singlePlayer', {
            url: "/game/singlePlayer",
            templateUrl: "modules/game/template/single-player.html",
            data: {pageTitle: 'Single player'}
        })

        // Versus
        .state('versus', {
            url: "/game/versus",
            templateUrl: "modules/game/template/versus.html",
            data: {pageTitle: 'Versus'}
        });

}]);