angular.module("WisestGame").controller('LoginController', ['$state', 'User', 'settings', function($state, User, settings) {

	this.userContext = {};
	
	this.login = function (){
		User.login.query({
			email: this.userContext.email,
			password: this.userContext.password			
		}).$promise
		.then(function(response) {
			settings.user = response;
			$state.go("dashboard", {}, {location: true});
		})
		.catch(function(err){
			console.error(err);
			alert(err.data);
		});
	};
	

}]);