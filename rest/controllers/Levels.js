const requireModule = require('../model/index').requireModule,
      Level = requireModule("Level"),
      reponseWithPromise = require('./Utility').reponseWithPromise;

module.exports = {
	findAll: function(req, res, next) {
		reponseWithPromise(Level.find({}, "_id, name"), res);
	}
};