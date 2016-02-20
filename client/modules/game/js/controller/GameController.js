angular.module("WisestGame").controller('GameController', ['Game', function(Game) {

	var self = this;

	this.pendingAnswer = false;
	this.currentQuestion = undefined;
	this.currentResponse = undefined;

	this.getQuestion = function() {
		this.pendingAnswer = false;
		this.currentResponse = undefined;

		Game.nextQuestion.query()
			.$promise
			.then(function(question) {
				self.currentQuestion = question;
				self.pendingAnswer = true;
			})
			.catch(function(err) {
				console.error(err);
			});
	};

	this.sendAnswer = function(option) {
		this.pendingAnswer = false;

		Game.checkAnswer.query({
			question: this.currentQuestion._id,
			answer: option
		})
		.$promise
		.then(function(response) {
			self.currentResponse = response;
		})
		.catch(function(err) {
			console.log(err);
		});
	};

	this.nextQuestion();

}]);