const requireModule = require('../model/index').requireModule,
	Question = requireModule("Question"),
	User = requireModule("User"),
	Score = requireModule("Score"),
	Level = requireModule("Level");

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
				console.log('Here');
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
		return Promise.all([
				User.findById(context.player),
				Question.findById(questionId)
			])
			.then(function(responses) {
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
				return {
					success: false,
					message: questionAnswer
				};
			});
	};

	this.answerQuestion = function(context, question, answer, timeLeft) {
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
		var promiseResult;
		var themeScore = user.getThemeScore(theme);
		if (themeScore) {
			promiseResult = Level.findById(themeScore.level).then(function(level) {
				console.log(themeScore);
				return {
					score: themeScore.score,
					level: { name : level.name, xp_level: level.xp_level, next_level: level.next_level }
				};
			});
		} else {
			promiseResult = Promise.resolve({
				score : 0
			});
		}
		return promiseResult;
	};

	this.getThemeLevel = function(user, theme) {

		var themeLevel = user.scores.level;
		var defaultLevel = {
			xp_level: 1,
			next_level: 100,
			name: "trainee"
		};
		return {
			level: defaultLevel
		};
	};
};

module.exports = new GameService();