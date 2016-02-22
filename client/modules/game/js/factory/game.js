angular.module('WisestGame').factory("Game", ['$resource', 'settings',
  function($resource, settings) {
    return {
      startGame: $resource(settings.serverUrl + '/game/start', {}, {
        query: {
          method: 'POST',
          params: {},
          isArray: false
        }
      }),
      nextQuestion: $resource(settings.serverUrl + '/game/next', {}, {
        query: {
          method: 'POST',
          params: {},
          isArray: false
        }
      }),
      checkAnswer: $resource(settings.serverUrl + '/game/checkAnswer', {}, {
        query: {
          method: 'POST',
          params: {},
          isArray: false
        }
      }),
      checkVersusAnswer: $resource(settings.serverUrl + '/game/checkVersusAnswer', {}, {
        query: {
          method: 'POST',
          params: {},
          isArray: false
        }
      }),
      getThemeScore: $resource(settings.serverUrl + '/game/getThemeScore', {}, {
        query: {
          method: 'GET',
          params: {},
          isArray: false
        }
      }),

      getThemeLevel: $resource(settings.serverUrl + '/game/getThemeLevel', {}, {
        query: {
          method: 'GET',
          params: {},
          isArray: false
        }
      }),
      getGameInfo: $resource(settings.serverUrl + '/game/getGameInfo', {}, {
        query: {
          method: 'GET',
          params: {},
          isArray: false
        }
      })
    };
  }
]);