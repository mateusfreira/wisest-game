const requireModule = require('../model/index').requireModule,
      Theme = requireModule("Theme"),
      reponseWithPromise = require('./Utility').reponseWithPromise;

module.exports = {
	findAll: function(req, res, next) {
		reponseWithPromise(Theme.find({}, "_id, name"), res);
	}
};