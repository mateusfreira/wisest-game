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
		return Question.findById(questionId)
		.then(function(question){
			return User.findById(context.player._id).then(function(user) {
				return user.scoreTheme(question.theme.toString(), question, 1);
			});
		}).then(function() {
			return {
				success: true,
				message: "You are the best!"
			};
		});
	};

	this.miss = function(context, questionId, answer) {
		console.log("Not implemented yet!");
		return Question.findById(questionId).then(function(question){
			return {
				success: false,
				message: question.answer
			};			
		});
	};

	this.answerQuestion = function(context, question, answer) {
		return Question.checkAnswerById(question, answer)
			.then(function(isItRight) {
				var result;
				if (isItRight) {
					result =  self.score(context, question, answer);
				} else {
					result = self.miss(context, question, answer);
				}
				return result;
			});
	};
};
module.exports = new GameService();