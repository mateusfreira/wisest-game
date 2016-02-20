angular.module("WisestGame").controller('SignupController', ['$state', 'User', function($state, User) {
	

	this.userContext = {};
	this.signup = function (){
		User.signup.query({
			mode: this.userContext.name,
			email: this.userContext.email,
			password: this.userContext.password,
			first_name: this.userContext.first_name,
			last_name: this.userContext.last_name,
		}).$promise
		.then(function(response) {
			$state.go("dashboard", {}, {location: true});
		})
		.catch(function(err){
			console.log(err);
		});
	};
	

}]);