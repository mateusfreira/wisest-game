angular.module('WisestGame').factory("User", ['$resource', 'settings',
  function($resource, settings) {
    return {
      doLogout: $resource(settings.serverUrl + '/user/logout', {}, {
        query: {
          method: 'GET',
          params: {},
          isArray: false
        }
      }),      
      logOut : function(){
          return this.doLogout.query().$promise;
      },
      current: function() {
        return this.getCurrent
          .query()
          .$promise
          .then(function(currentUser) {
            currentUser.icon = new Identicon(currentUser.id.toString(), 420).toString();
            return currentUser;
          });
      },
      getCurrent: $resource(settings.serverUrl + '/user/current', {}, {
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
      facebook: $resource(settings.serverUrl + '/user/auth/facebook', {}, {
        query: {
          method: 'GET',
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