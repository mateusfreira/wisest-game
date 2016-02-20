const requireModule = require('../model/index').requireModule;
const GameService = require('../services/GameService');
const Question = requireModule("Question");
module.exports = {

  some: function(req, res, next) {
    Question.some(req.gameContext).then(function(question) {
      res.status(200).send(question);
    }).catch(function(e) {
      res.status(500).send({
        e: "Error!"
      });
    });

  },
  check: function(req, res, next) {

    var question = req.query.id;
    var answer = req.query.answer;
    return GameService.answerQuestion(req.gameContext, question, answer)
      .then(function(r) {
          res.status(200).send(r);
      }).catch(function(e) {
        res.status(500).send("sd");
      });
  }
};