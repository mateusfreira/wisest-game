const requireModule = require('../model/index').requireModule,
	Question = requireModule("Question"),
	User = requireModule("User"),
	Score = requireModule("Score"),
	Promise = require("bluebird");

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
		var questionPromise;
		if (gameContext.currentQuestion) {
			gameContext.currentQuestion.spentTime = new Date().getTime() - gameContext.currentQuestion.start;
			questionPromise = Promise.resolve(gameContext.currentQuestion);
		} else {
			questionPromise = Question.some(gameContext.player, gameContext.theme).then(function(question) {
				gameContext.currentQuestion = {
					_id: question._id,
					description: question.description,
					code: question.code,
					duration: question.duration,
					start: new Date().getTime(),
					spentTime: 0,
					options: question.options
				};
				return gameContext.currentQuestion;
			});
		}
		return questionPromise;
	};

	this.score = function(context, questionId, timeLeft) {
		console.log("Wrere1");
		return Promise.all([
				User.findById(context.player),
				Question.findById(questionId)
			])
			.then(function(responses) {
				console.log("Wrere2");
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
				questionAnswer = responses[1].answer;
				var themeScore = user.getThemeScore(context.theme);
				var score = themeScore ? themeScore.score : 0;
				return user.scoreLog(questionId, context.theme, context.mode, false, score, score);
			})
			.then(function() {
				console.log("Wrere3");
				return {
					success: false,
					message: questionAnswer
				};
			});
	};

	this.answerQuestion = function(context, question, answer, timeLeft) {
		console.log("Wrere4");
		return Question.checkAnswerById(question, answer)
			.then(function(isItRight) {
				var result;
				delete context.currentQuestion;
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
		return {
			score: (themeScore ? themeScore.score : 0)
		};
	};

	this.getThemeLevel = function(user, theme) {

		var themeLevel = user.getUserLevel(theme);
		var defaultLevel = {
			xp_level: 1,
			next_level: 100,
			name: "trainee"
		};
		return {
			level: (themeLevel ? themeLevel : defaultLevel)
		};
	};
};

module.exports = new GameService();