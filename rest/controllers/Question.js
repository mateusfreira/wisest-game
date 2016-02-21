const requireModule = require('../model/index').requireModule,
      QuestionService = require("../services/QuestionService"),
      reponseWithPromise = require('./Utility').reponseWithPromise;

module.exports = {
	findAll: function(req, res) {
		reponseWithPromise(QuestionService.findAll(req.user), res);
	},
	findOne: function(req, res, next, id) {
		res.status(200).send({});
	},
	findById: function(req, res, next, id) {
		reponseWithPromise(QuestionService.findById(id, req.user), res);
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