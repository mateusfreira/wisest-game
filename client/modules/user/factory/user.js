angular.module('WisestGame').factory("User", ['$resource', 'settings',
  function($resource, settings) {
    return {
      signup: $resource(settings.serverUrl + '/user/signup', {}, {
        query: {
          method: 'POST',
          params: {},
          isArray: false
        }
      }),
      login: $resource(settings.serverUrl + '/user/login', {}, {
        query: {
          method: 'POST',
          params: {},
          isArray: false
        }
      })
    };
  }
]);