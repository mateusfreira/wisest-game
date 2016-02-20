const requireModule = require('../model/index').requireModule;
const User = requireModule("User");
const GameService = require('../services/GameService');
module.exports = {
  session: function(req, res, next) {
    req.session.regenerate(function(err) {
      res.status(200).send({});
    });
  },
  start: function(req, res, next) {

    GameService.start(req.session, {
      player: {
        _id : "56c892ce283c617e7c8b0ed4",
        name: "Jon due!",
      },
      theme: "javascript",
      mode: "begining"
    });
    console.log('Last', req.session);
    res.status(200).send({});
  }
};