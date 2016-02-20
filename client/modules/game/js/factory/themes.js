angular.module('WisestGame').factory('Themes', ['$resource', 'settings',
	function($resource, settings) {
		return $resource(settings.serverUrl + '/themes');
	}
]);