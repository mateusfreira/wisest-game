angular.module('WisestGame').factory('Question', ['$resource', 'settings',
	function($resource, settings) {
		return $resource(settings.serverUrl + '/questions/:questionId', { questionId: '@_id'
		}, {
			update: { method: 'PUT' }
		});
	}
]);