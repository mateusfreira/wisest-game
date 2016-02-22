angular.module("WisestGame").controller('GameController', ['Game', 'User', '$window', '$scope', 'socketClient', function(Game, User, $window, $scope, socketClient) {

	var self = this;

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

		return Game.checkAnswer.query({
				question: this.currentQuestion._id,
				answer: option,
				timeLeft: this.currentQuestion.timer
			})
			.$promise
			.then(function(response) {
				self.currentResponse = response;
				updateScoreAfterRightAnswer();
				getThemeScore();
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

	function updateScoreAfterRightAnswer() {
		if (self.currentResponse.score) {
			self.score = self.currentResponse.score;
		}
	}

	function getThemeScore() {
		Game.getThemeScore.query().$promise.then(function(response) {
			self.score = response.score;
			self.level = response.level || {next_level : 100, xp_level : 0};
			var leveSize = self.level.next_level - self.level.xp_level;
			var diff = leveSize - (self.level.next_level - self.score);
			self.currentPrecent = (diff / leveSize)*100;

		});
	}

	// getThemeScore();
	// this.nextQuestion();

	function getRoomAndSubscribe() {
		Game.getRoom.query().$promise.then(function(result){
			console.log(result);
			socketClient.subscribe(result.room);
		});
	}
	getRoomAndSubscribe();

	socketClient.addListener("gameInfo", function(data) {
		console.warn(data);
	});

}]);