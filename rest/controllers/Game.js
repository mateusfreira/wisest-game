const requireModule = require('../model/index').requireModule;
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
        name: "Jon due!", // req.user._id,
      },
      theme: req.body.theme,
      mode: req.body.mode
    });
    console.log('Last', req.session);
    res.status(200).send({});
  }
};