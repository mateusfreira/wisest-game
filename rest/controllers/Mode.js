const requireModule = require('../model/index').requireModule,
      Mode = requireModule("Mode"),
      reponseWithPromise = require('./Utility').reponseWithPromise;

module.exports = {
	findAll: function(req, res) {
		reponseWithPromise(Mode.find({}, "_id, name"), res);
	}
};