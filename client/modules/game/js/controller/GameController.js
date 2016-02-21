angular.module("WisestGame").controller('GameController', ['Game','User', '$window', '$scope', function(Game, User, $window, $scope) {

	var self = this;

	this.pendingAnswer = false;
	this.currentQuestion = undefined;
	this.currentResponse = undefined;

	var interval;
	this.getCurrentUserInfo = function(){
		User.current
			.query()
			.$promise
			.then(function(currentUser){
				self.currentUser = currentUser;
			});
	};
	this.nextQuestion = function() {
		this.pendingAnswer = false;
		this.currentResponse = undefined;

		Game.nextQuestion.query()
			.$promise
			.then(function(question) {
				question.timer = question.duration;
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
		})
		.catch(function(err) {
			console.log(err);
		});
	};

	this.getTimerValue = function() {
		return $window.moment(this.currentQuestion.timer).format("mm:ss");
	};

	function descrementTimer() {
		self.currentQuestion.timer -= 1000;

		if (!$scope.$$phase) $scope.$apply();

		if (self.currentQuestion.timer <= 0) {
			questionTimeout();
		}
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
		Game.getThemeScore.query().$promise.then(function(response){
			self.score = response.score;
		});
	}

	function getThemeLevel() {

		Game.getThemeLevel.query().$promise.then(function(response){			
			self.level = response.level;

		});
	}

	getThemeScore();
	getThemeLevel();
	this.nextQuestion();
	this.getCurrentUserInfo();

}]);