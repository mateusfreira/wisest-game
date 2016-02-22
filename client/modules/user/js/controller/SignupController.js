angular.module("WisestGame").controller('SignupController', ['$state', 'User','settings', function($state, User,settings) {
	

	this.userContext = {};
	this.signup = function (){
		User.signup.query({			
			email: this.userContext.email,
			password: this.userContext.password,
			first_name: this.userContext.first_name,
			last_name: this.userContext.last_name
		}).$promise
		.then(function(response) {
			$state.go("dashboard", {}, {location: true});
		})
		.catch(function(err){
			
			alert(err.data);
		});
	};

	this.signupFacebook = function (){
		window.location.href   = settings.serverUrl+'/user/auth/facebook';
		return;
		
	};
	

}]);