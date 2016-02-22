angular.module("WisestGame").controller('GameController', ['Game', 'User', '$window', '$scope', '$timeout', '$location', function(Game, User, $window, $scope, $timeout, $location) {

	var self = this;

	this.pendingAnswer = false;
	this.currentQuestion = undefined;
	this.currentResponse = undefined;
	this.answerHighlight = "";

	var interval;

	this.nextQuestion = function() {
		this.pendingAnswer = false;
		this.currentResponse = undefined;
		this.answerHighlight = "";

		Game.nextQuestion.query()
			.$promise
			.then(function(question) {
				question.timer = question.duration - question.spentTime;
				self.currentQuestion = question;

				interval = setInterval(descrementTimer, 1000);
				self.pendingAnswer = true;
			})
			.catch(function(err) {
				if(err.status == 500){
					alert('There is no more question in this theme for you!');
					$location.path('dashboard');					
				}
			});
	};

	this.sendAnswer = function(option) {
		this.selectedOption = option;
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
				setAnswerHighlight();
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

	function setAnswerHighlight(timeoutFlag) {
		if(timeoutFlag) {
			self.answerHighlight = "TIMEOUT!";
			self.answerHighlightClass = "yellow";
		} else if(self.currentResponse.score) {
			self.currentResponse.message = self.selectedOption;
			self.answerHighlight = "CORRECT!";
			self.answerHighlightClass = "green";
		} else {
			self.answerHighlight = "WRONG!";
			self.answerHighlightClass = "red";
		}

		$timeout(function() {
			self.answerHighlight = "";
			self.nextQuestion();
		}, 3000);

	}

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
			// setAnswerHighlight(true);
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
	getThemeScore();
	this.nextQuestion();

}]);