const requireModule = require('../model/index').requireModule,
	  Question = requireModule("Question"),
	  User = requireModule("User"),
	  Score = requireModule("Score");

function GameService() {
	var self = this;

	this.start = function(contextContainer, player, mode, theme) {
		contextContainer.gameContext = {
			player: player,
			theme: theme,
			mode: mode
		};
		return contextContainer.gameContext;
	};

	this.nextQuestion = function(gameContext) {
		return Question.some(gameContext).then(function(question) {
			return {
				_id: question._id,
				description: question.description,
				code: question.code,
				options: question.options
			};
		});
	};
	
	this.score = function(context, questionId) {
		return Promise.all([
			User.findById(context.player),
			Question.findById(questionId)
		])
		.then(function(responses){
			var user = responses[0];
			var question = responses[1];
			return user.scoreTheme(question.theme.toString(), question, context.mode, 1);
		})
		.then(function() {
			return {
				success: true,
				message: "You are the best!"
			};
		});
	};

	this.miss = function(context, questionId, answer) {
		var questionAnswer;
		return Promise.all([
			User.findById(context.player),
			Question.findById(questionId),
		])
		.then(function(responses) {
			var user = responses[0];
			var themeScore = user.getThemeScore(context.theme);
			var score = themeScore ? themeScore.score : 0;
			questionAnswer = responses[1].answer;
			return user.scoreLog(questionId, context.theme, context.mode, false, score, score);
		})
		.then(function() {
			return { success: false, message: questionAnswer };
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