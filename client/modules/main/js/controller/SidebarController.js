angular.module("WisestGame").controller('SidebarController', [function() {
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
			"label": "Start game",
			"href": "#/game/start"
		}
	];
}]);