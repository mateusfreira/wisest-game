angular.module('WisestGame').factory('Levels', ['$resource', 'settings',
	function($resource, settings) {
		return $resource(settings.serverUrl + '/levels');
	}
]);