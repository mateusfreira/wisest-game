const requireModule = require('../model/index').requireModule;
const Question = requireModule("Question");
const GameService = function() {
	var self = this;
	this.score = function(context, question) {
		console.log("Not implemented yet!");
		return {
			value: "You are the best!"
		};
	};

	this.lose = function(context, question, answer) {
		console.log("Not implemented yet!");
		return {
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