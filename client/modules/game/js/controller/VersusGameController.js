angular.module("WisestGame").controller('VersusGameController', ['Game', 'User', '$window', '$scope', 'socketClient', function(Game, User, $window, $scope, socketClient) {

	var self = this;

	this.waitingForPlayers = true;

	this.pendingAnswer = false;
	this.currentQuestion = undefined;
	this.currentResponse = undefined;

	var interval;

	this.nextQuestion = function() {
		this.pendingAnswer = false;
		this.currentResponse = undefined;

		Game.nextQuestion.query()
			.$promise
			.then(function(question) {
				question.timer = question.duration - question.spentTime;
				self.currentQuestion = question;
				clearInterval(interval);
				interval = setInterval(descrementTimer, 1000);
				self.pendingAnswer = true;
			})
			.catch(function(err) {
				console.error(err);
			});
	};

	this.sendAnswer = function(option) {
		this.pendingAnswer = false;
		clearInterval(interval);

		return Game.checkVersusAnswer.query({
				question: this.currentQuestion._id,
				answer: option,
				timeLeft: this.currentQuestion.timer
			})
			.$promise
			.then(function(response) {
				self.currentResponse = response;
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	this.getTimerValue = function() {
		var timeAsString;
		if (this.currentQuestion.timer < 0) {
			timeAsString = "0:00";
		} else {
			timeAsString = $window.moment(this.currentQuestion.timer).format("mm:ss");
		}
		return timeAsString;
	};

	function descrementTimer() {
		self.currentQuestion.timer -= 1000;
		if (self.currentQuestion.timer <= 0) {
			questionTimeout();
		}
		if (!$scope.$$phase) $scope.$apply();
	}

	function questionTimeout() {
		self.sendAnswer().then(function() {
			self.currentResponse.message = "Timeout! " + self.currentResponse.message;
		});
	}

	function getGameInfo() {
		Game.getGameInfo.query().$promise.then(function(result){
			self.currentPlayer = result.player;
			subscribe(result.room);
		});
	}

	function subscribe(room) {
		socketClient.subscribe(room);
	}

	getGameInfo();

	socketClient.addListener("gameInfo", function(data) {
		updatePlayersInfo(data.gameInfo);
	});

	function updatePlayersInfo(players) {
		players.forEach(function(player){
			player.icon = new Identicon(player._id.toString(), 420).toString();
			if (self.currentPlayer.toString() === player._id.toString()) {
				self.playerOne = player;
			} else {
				self.playerTwo = player;
			}
		});
	}

	socketClient.addListener("startGame", function() {
		self.waitingForPlayers = false;
		if (!$scope.$$phase) $scope.$apply();
		self.nextQuestion();
	});

}]);