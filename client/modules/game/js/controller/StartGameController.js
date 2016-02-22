angular.module("WisestGame").controller('StartGameController', ['$state', 'Themes', 'Modes', 'Game', function($state, Themes, Modes, Game) {

	var self = this;

	this.modes = Modes.query();
	this.themes = Themes.query();
	this.gameContext = {};

	this.startGame = function() {
		Game.startGame.query({
			mode: this.gameContext.mode._id,
			theme: this.gameContext.theme._id
		}).$promise
		.then(function(response) {
			var state;
			if (response.isSingle)
				state = "singlePlayer";
			else
				state = "versus";
			$state.go(state, {}, {location: true});
		})
		.catch(function(err){
			console.log(err);
		});
	};

}]);