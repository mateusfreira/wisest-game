angular.module("WisestGame")
	.controller('StartGameController', ['$scope', '$state', 'Themes', 'Modes', 'Game',
		function($scope, $state, Themes, Modes, Game) {

			var self = this;

			this.modes = Modes.query();
			this.themes = Themes.query();
			this.gameContext = {};

			this.chooseMode = function(mode) {
				$scope.selectedMode = mode;
			};

			this.chooseTheme = function(theme) {
				$scope.selectedTheme = theme;
			};

			this.backToMode = function() {
				$scope.selectedMode = undefined;
			};

			this.backToTheme = function() {
				$scope.selectedTheme = undefined;
			};

			this.startGame = function() {
				this.gameContext.mode = $scope.selectedMode;
				this.gameContext.theme = $scope.selectedTheme;

				Game.startGame.query({
					mode: $scope.selectedMode._id,
					theme: $scope.selectedTheme._id
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
		}
	]
);