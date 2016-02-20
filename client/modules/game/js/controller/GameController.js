angular.module("WisestGame").controller('GameController', ['Game', function(Game) {

	var self = this;

	this.currentQuestion = {};

	this.nextQuestion = function() {
		Game.nextQuestion.query()
			.$promise
			.then(function(question) {
				self.currentQuestion = question;
			})
			.catch(function(err) {
				console.error(err);
			});
	};

	this.checkAnswer = function() {
		Game.checkAnswer.query({
			question: this.currentQuestion._id,
			answer: this.currentQuestion.answer
		})
		.$promise
		.then(function(response) {
			console.log(response);
		})
		.catch(function(err) {
			console.log(err);
		});
	};

	this.nextQuestion();

}]);