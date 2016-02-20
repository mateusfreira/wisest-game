var requireModule = require('../model/index').requireModule;
const Question = requireModule("Question");
module.exports = {
  some : function(req, res, next) {
  	Question.find().then(function(question){
  		res.status(200).send(question);	
  	});
  },
  check : function(req, res, next) {
  	var question = req.query.id;
  	var answer = req.query.answer;
  	Question.findById(question)
  	.then(function(question){
  		res.status(200).send(question);	
  	}).catch(function(e){
  		console.log(e);
  		res.status(500).send(e);	
  	});
  }
};