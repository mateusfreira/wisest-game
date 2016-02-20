const requireModule = require('../model/index').requireModule;
const GameService = require('../services/GameService');
const Question = requireModule("Question");
module.exports = {
  check: function(req, res, next) {
    var question = req.query.id;
    var answer = req.query.answer;
    return GameService.answerQuestion(req.session.gameContext, question, answer)
      .then(function(r) {
        res.status(200).send(r);
      }).catch(function(e) {
        res.status(500).send(["sd", e]);
      });
  }
};