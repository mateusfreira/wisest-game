const requireModule = require('../model/index').requireModule,
	Question = requireModule("Question"),
	User = requireModule("User"),
	Score = requireModule("Score"),
	Game = requireModule("Game"),
	Mode = requireModule("Mode"),
	Level = requireModule("Level");

function GameService() {
	var self = this;
	var deviationPercentage = 0.5;

	this.start = function(contextContainer, owner, modeId, themeId, socketService) {
		if (!contextContainer.gameContext) {
			return Mode.findById(modeId)
			.then(function(mode){
				if (mode.isSingle) {
					return findSinglePlayer(owner._id, modeId, themeId);
				} else {
					return findGameToPlay(themeId, modeId, owner, socketService);
				}
			})
			.then(function(game){
				var gameContext = {
					room: game._id,
					owner: owner._id,
					theme: themeId,
					mode: modeId
				};
				contextContainer.gameContext = gameContext;
				return contextContainer.gameContext;
			});
		}
		return Promise.resolve(contextContainer.gameContext);
	};

	function findSinglePlayer(ownerId, modeId, themeId){
		return Game.findOne({ owner: ownerId, mode: modeId, themeId: themeId })
			.then(function(game){
				if (!game) {
					return factoryGame(ownerId, modeId, themeId);
				}
				return game;
			});
	}

	function findGameToPlay(themeId, modeId, user, socketService) {
		var themeScore = user.getThemeScore(themeId);
		var xp = themeScore ? themeScore.score : 0;
		return Game.find({ theme: themeId, mode: modeId })
		    .populate([{path:'owner', select:'_id scores'}])
		    .then(function(games){
		    	var game;
		    	for (var i = 0; i < games.length; i++) {
		    		var gameThemeScore = games[i].owner.getThemeScore(themeId);
		    		var gameXp = themeScore ? themeScore.score : 1;
		    		games[i].ownerXp = gameXp;
		    		games[i].difference = Math.abs(xp - gameXp);
		    		if (isFair(xp, games[i].difference) && (!game || game.difference > games[i].difference)) {
		    			game = games[i];
		    		}
		    	}
		    	if (game) {
		    		game.players.push({
		    			user: user._id,
		    			score: 0
		    		}).save();
		    	} else {
		    		game = factoryGame(user._id, modeId, themeId).then(function(game){
						socketService.createRoom(game._id, modeId);
		    			return game;
		    		});
		    	}
		    	return game;
		    });
	}

	function isFair(xp, difference){
		return xp * deviationPercentage >= difference;
	}

	function factoryGame(ownerId, modeId, themeId) {
		return new Game({
			theme: themeId,
			mode: modeId,
			players: [{
				user: ownerId,
				score: 0
			}],
			owner: ownerId
		}).save();
	}

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