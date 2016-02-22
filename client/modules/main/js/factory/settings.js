/* Setup global settings */
WisestGame.factory('settings', ['$rootScope', function($rootScope) {
    var settings = {
    	serverUrl: "http://169.53.129.27:3000"
    };

    $rootScope.settings = settings;

    return settings;
}]);