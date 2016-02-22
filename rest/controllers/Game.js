const requireModule = require('../model/index').requireModule,
      User = requireModule("User"),
      GameService = require('../services/GameService'),
      Question = requireModule("Question"),
      reponseWithPromise = require('./Utility').reponseWithPromise;
      
module.exports = function(app) {
  return {
    start: function(req, res) {
      reponseWithPromise(GameService.start(req.session, req.user, req.body.mode, req.body.theme, app.socket), res);
    },
    next: function(req, res) {
      reponseWithPromise(GameService.nextQuestion(req.session.gameContext), res);
    },
    checkAnswer: function(req, res) {
      reponseWithPromise(GameService.answerQuestion(req.session.gameContext, req.body.question, req.body.answer, req.body.timeLeft), res);
    },
    getThemeScore: function(req, res) {
      reponseWithPromise(GameService.getThemeScore(req.user, req.session.gameContext.theme), res);
    },
    getThemeLevel: function(req, res) {
      res.status(200).send(GameService.getThemeLevel(req.user, req.session.gameContext.theme));
    },
    getGameInfo: function(req, res) {
      res.status(200).send({ room: req.session.gameContext.room, player: req.session.gameContext.player });
    }
  };
};