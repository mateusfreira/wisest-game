angular.module("WisestGame").controller('LoginController', ['$state', 'User', function($state, User) {
	

	this.userContext = {};
	this.login = function (){
		User.login.query({			
			email: this.userContext.email,
			password: this.userContext.password			
		}).$promise
		.then(function(response) {
			$state.go("dashboard", {}, {location: true});
		})
		.catch(function(err){
			console.error(err);
		});
	};
	

}]);