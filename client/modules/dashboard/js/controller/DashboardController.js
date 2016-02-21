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

	this.logOut = function(){
		User.logOut().then(function(){
			$location.path('user/login');
		});
	};
}]);