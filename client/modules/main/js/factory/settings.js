/* Setup global settings */
WisestGame.factory('settings', ['$rootScope', function($rootScope) {
    var settings = {
    	serverUrl: "http://localhost:3000"
    };

    $rootScope.settings = settings;

    return settings;
}]);