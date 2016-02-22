angular.module("WisestGame").controller('DashboardController', ["User", "$location", function(User, $location) {
	var self = this;
	this.helloWorld = "Dashboard";
	User.current()
		.then(function(currentUser) {
			self.currentUser = currentUser;
		});
	this.startGame = function(){
		$location.path('game/start');
	};

	this.createQuestions = function(){
		$location.path('questions/create');
	};

	this.listQuestions = function(){
		$location.path('questions');
	};	

	this.moderateQuestions = function(){
		$location.path('questions/correct');
	};	

	this.logOut = function(){
		User.logOut().then(function(){
			$location.path('user/login');
		});
	};
}]);