/* WisestGame App */
var WisestGame = angular.module("WisestGame", ["ui.router", "ngResource"]); 

/* Init global settings and run the app */
WisestGame.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);