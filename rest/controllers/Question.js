const requireModule = require('../model/index').requireModule,
      QuestionService = require("../services/QuestionService"),
      reponseWithPromise = require('./Utility').reponseWithPromise;

module.exports = {
	findAll: function(req, res) {
		reponseWithPromise(QuestionService.findAll(req.user), res);
	},
	findOne: function(req, res) {
		res.status(200).send(QuestionService.extractPublicAPI(req.question));
	},
	nextToApprove: function(req, res) {
    	reponseWithPromise(QuestionService.nextQuestion(req.user), res);
  	},
	findById: function(req, res, next, id) {
		QuestionService.findById(id, req.user).then(function(question) {
			req.question = question;
			next();
		});
	},
	create: function(req, res) {
		delete req.body.level;
		reponseWithPromise(QuestionService.create(req.body, req.user), res);
	},
	ideverythingOk : function(req, res){
		console.log(req.question);
		reponseWithPromise(QuestionService.ideverythingOk(req.question, req.user), res);
	},
	update: function(req, res) {
		console.log(req.question);
		delete req.body.level;
		reponseWithPromise(QuestionService.update(req.question, req.body, req.user), res);
	},
	delete: function(req, res) {
		res.status(200).send({});
	}
};