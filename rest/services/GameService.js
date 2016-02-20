const requireModule = require('../model/index').requireModule;
const Question = requireModule("Question");
const User = requireModule("User");
const GameService = function() {
	var self = this;

	this.start = function(contextContainer, contextStart) {
		contextContainer.gameContext = {
			player: contextStart.player,
			theme: contextStart.theme,
			mode: contextStart.mode
		};
	};

	this.score = function(context, question) {

		return User.findById(context.player._id).then(function(user) {
			user.score = (user.score || 0) + 1;
			return user.save();
		}).then(function() {
			return {
				success : true,
				value: "You are the best!"
			};
		});
	};

	this.lose = function(context, question, answer) {
		console.log("Not implemented yet!");
		return {
			success : false,
			value: "You can do it better!"
		};
	};

	this.answerQuestion = function(context, question, answer) {
		return Question.checkAnswerById(question, answer)
			.then(function(isItRight) {
				var result;
				if (isItRight) {
					result = self.score(context);
				} else {
					result = self.lose(context, question, answer);
				}
				return result;
			});
	};
};
module.exports = new GameService();