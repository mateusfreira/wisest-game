const requireModule = require('../model/index').requireModule;
const Question = requireModule("Question");
const User = requireModule("User");
const Score = requireModule("Score");
const GameService = function() {
	var self = this;

	this.nextQuestion = function(gameContext) {
		return Question.some(gameContext).then(function(question) {
			return {
				_id: question._id,
				description: question.description,
				options: question.options
			};
		});
	};
	this.start = function(contextContainer, player, mode, theme) {
		contextContainer.gameContext = {
			player: player,
			theme: theme,
			mode: mode
		};
		return {};
	};

	this.score = function(context, questionId) {
		return Question.findById(questionId)
			.then(function(question) {
				return User.findById(context.player).then(function(user) {
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
		return Question.findById(questionId).then(function(question) {
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
					result = self.score(context, question, answer);
				} else {
					result = self.miss(context, question, answer);
				}
				return result;
			});
	};
};
module.exports = new GameService();