angular.module("WisestGame").controller('GameController', ['Game', '$window', '$scope', function(Game, $window, $scope) {

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
				question.timer = question.duration;
				self.currentQuestion = question;

				interval = setInterval(descrementTimer, 1000);
				self.pendingAnswer = true;
			})
			.catch(function(err) {
				console.error(err);
			});
	};

	function descrementTimer() {
		self.currentQuestion.timer -= 1000;

		if (!$scope.$$phase) $scope.$apply();
		
		if (self.currentQuestion.timer <= 0) {
			questionTimeout();
		}
	}

	function questionTimeout(argument) {
		self.sendAnswer().then(function() {
			self.currentResponse.message = "Timeout! " + self.currentResponse.message;
		});
	}

	this.sendAnswer = function(option) {
		this.pendingAnswer = false;
		clearInterval(interval);

		return Game.checkAnswer.query({
			question: this.currentQuestion._id,
			answer: option,
			spentTime: 15000
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
		return $window.moment(this.currentQuestion.timer).format("mm:ss")
	};

	this.nextQuestion();

}]);