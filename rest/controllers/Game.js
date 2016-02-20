const requireModule = require('../model/index').requireModule;
const User = requireModule("User");
const GameService = require('../services/GameService');
const Question = requireModule("Question");
module.exports = {
  session: function(req, res, next) {
    req.session.regenerate(function(err) {
      res.status(200).send({});
    });
  },
  start: function(req, res, next) {
    console.log("Request", req.session);
    GameService.start(req.session, {
      player: {
        _id: "56c892ce283c617e7c8b0ed4",
        name: "Jon due!",
      },
      theme: req.body.theme,
      mode: req.body.mode
    });
    res.status(200).send({});
  },
  next: function(req, res, next) {
    Question.some(req.session.gameContext).then(function(question) {
      res.status(200).send({
        _id: question._id,
        description: question.description,
        options: question.options
      });
    }).catch(function(e) {
      res.status(500).send({
        e: "Error!"
      });
    });
  },
  checkAnswer: function(req, res, next) {
    var question = req.body.question;
    var answer = req.body.answer;
    return GameService.answerQuestion(req.session.gameContext, question, answer)
      .then(function(r) {
        res.status(200).send(r);
      }).catch(function(e) {
        res.status(500).send(["sd", e]);
      });
  }
};