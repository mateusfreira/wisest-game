angular.module("WisestGame").controller('SidebarController', ['User',function(User) {
	var self = this;
	this.menus = [
		{
			"label": "Dashboard",
			"href": "#/dashboard"
		},
		{
			"label": "Profile",
			"href": "#/user/profile"
		},
		{
			"label": "Sign up",
			"href": "#/user/signup"
		},
		{
			"label": "Login",
			"href": "#/user/login"
		},
		{
			"label": "Start game",
			"href": "#/game/start"
		}
	];

	this.getCurrentUserInfo = function() {
		User.current()
			.then(function(currentUser) {
				self.currentUser = currentUser;
			});
	};
	this.getCurrentUserInfo();
}]);