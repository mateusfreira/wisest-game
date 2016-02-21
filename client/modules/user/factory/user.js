angular.module('WisestGame').factory("User", ['$resource', 'settings',
  function($resource, settings) {
    return {
      current: $resource(settings.serverUrl + '/user/current', {}, {
        query: {
          method: 'GET',
          params: {},
          isArray: false
        }
      }),      
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