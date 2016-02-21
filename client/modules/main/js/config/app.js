/* WisestGame App */
var WisestGame = angular.module("WisestGame", ["ui.router", "ngResource"]);

/* Init global settings and run the app */
WisestGame.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
	$rootScope.$state = $state; // state to be accessed from view
}]).config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.interceptors.push(['$q', '$location',
		function($q, $location) {
			return {
				responseError: function(rejection) {
					if (rejection.status == 403) {
						$location.path('user/login');
					}
					return $q.reject(rejection);
				}
			};
		}
	]);
}]);