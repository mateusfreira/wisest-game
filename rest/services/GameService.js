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
		return Question.some(gameContext.player, gameContext.theme).then(function(question) {
			return {
				_id: question._id,
				description: question.description,
				code: question.code,
				duration: question.duration,
				options: question.options
			};
		});
	};
	
	this.score = function(context, questionId, timeLeft) {
		return Promise.all([
			User.findById(context.player),
			Question.findById(questionId)
		])
		.then(function(responses){
			var user = responses[0];
			var question = responses[1];
			var score = Math.round(Math.pow(2, question.difficulty) / question.duration * timeLeft);
			return user.scoreTheme(question.theme.toString(), question, context.mode, score);
		})
			
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

	this.answerQuestion = function(context, question, answer, timeLeft) {
		return Question.checkAnswerById(question, answer)
		.then(function(isItRight) {
			var result;
			if (isItRight) {
				result = self.score(context, question, timeLeft);
			} else {
				result = self.miss(context, question, answer);
			}
			return result;
		});
	};

	this.getThemeScore = function(user, theme) {
		var themeScore = user.getThemeScore(theme);
		return { score: (themeScore ? themeScore.score : 0) };
	};

	this.getThemeLevel = function(user, theme) {

		var themeLevel = user.getUserLevel(theme);
		var defaultLevel = {xp_level : 1,next_level : 100,name : "trainee"};
		return { level: (themeLevel ? themeLevel : defaultLevel) };
	};
};

module.exports = new GameService();