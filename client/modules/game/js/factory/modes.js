angular.module('WisestGame').factory('Modes', ['$resource', 'settings',
	function($resource, settings) {
		return $resource(settings.serverUrl + '/modes');
	}
]);