const requireModule = require('../model/index').requireModule;
const Question = requireModule("Question");
const User = requireModule("User");
const Score = requireModule("Score");
const GameService = function() {
	var self = this;

	this.start = function(contextContainer, contextStart) {
		contextContainer.gameContext = {
			player: contextStart.player,
			theme: contextStart.theme,
			mode: contextStart.mode
		};
	};

	this.score = function(context, questionId) {
		Question.findById(questionId)
		.then(function(question){
			return User.findById(context.player._id).then(function(user) {
				return user.scoreTheme(question.theme._id, question, 1);
			});
		}).then(function() {
			return {
				success: true,
				message: "You are the best!"
			};
		});
	};

	this.lose = function(context, question, answer) {
		console.log("Not implemented yet!");
		return {
			success: false,
			message: "You can do it better!"
		};
	};

	this.answerQuestion = function(context, question, answer) {
		return Question.checkAnswerById(question, answer)
			.then(function(isItRight) {
				var result;
				if (isItRight) {
					result = self.score(context, question);
				} else {
					result = self.lose(context, question, answer);
				}
				return result;
			});
	};
};
module.exports = new GameService();