/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    var settings = {};

    $rootScope.settings = settings;

    return settings;
}]);