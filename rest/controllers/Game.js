const requireModule = require('../model/index').requireModule,
      User = requireModule("User"),
      GameService = require('../services/GameService'),
      Question = requireModule("Question"),
      reponseWithPromise = require('./Utility').reponseWithPromise;
      
module.exports = {
  start: function(req, res) {
    var result = GameService.start(req.session, "56c892ce283c617e7c8b0ed4", req.body.mode, req.body.theme);
    res.status(200).send(result);
  },
  next: function(req, res) {
    reponseWithPromise(GameService.nextQuestion(req.session.gameContext), res);
  },
  checkAnswer: function(req, res) {
    reponseWithPromise(GameService.answerQuestion(req.session.gameContext, req.body.question, req.body.answer), res);
  }
};