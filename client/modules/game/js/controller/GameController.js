angular.module("WisestGame").controller('GameController', ['$scope', 'Themes', 'Modes', 'Game', function($scope, Themes, Modes, Game) {

	this.modes = Modes.query();
	this.themes = Themes.query();
	this.gameContext = {};

	this.startGame = function() {
		Game.startGame.query({
			mode: this.gameContext.mode._id,
			theme: this.gameContext.theme._id
		}).$promise
		.then(function(response) {
			console.log(response);
		})
		.catch(function(err){
			console.log(err);
		});
	};

}]);