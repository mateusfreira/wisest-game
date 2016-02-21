const requireModule = require('../model/index').requireModule,
      QuestionService = require("../services/QuestionService"),
      reponseWithPromise = require('./Utility').reponseWithPromise;

module.exports = {
	findAll: function(req, res) {
		res.status(200).send([{}]);
	},
	findOne: function(req, res, next, id) {
		res.status(200).send({});
	},
	findById: function(req, res, next, id) {
		reponseWithPromise(QuestionService.findById(id), res);
	},
	create: function(req, res) {
		delete req.body.level;
		reponseWithPromise(QuestionService.create(req.body, req.user), res);
	},
	update: function(req, res) {
		res.status(200).send({});
	},
	delete: function(req, res) {
		res.status(200).send({});
	}
};