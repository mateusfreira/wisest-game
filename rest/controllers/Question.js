var requireModule = require('../model/index').requireModule;

module.exports = {
  some : function(req, res, next) {
  	const Question = requireModule("Question");
  	Question.find().then(function(question){

  		res.status(200).send(question);	
  	});
    
  }
};
