angular.module('WisestGame').factory("Game", ['$resource', 'settings',
	function($resource, settings) {
    return {
      startGame: $resource(settings.serverUrl + '/game/start', {}, {
        query: { method: 'POST', params: {}, isArray: false }
      })
    };
  }]);