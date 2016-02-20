const requireModule = require('../model/index').requireModule;
const Mode = requireModule("Mode");
module.exports = {
  findAll: function(req, res, next) {
    Mode.find().then(function(modes) {
      res.status(200).send(modes);
    }).catch(function(err) {
      res.status(500).send({error: err});
    });
  }
};