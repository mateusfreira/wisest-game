const requireModule = require('../model/index').requireModule;
const GameService = require('../services/GameService');
const Question = requireModule("Question");
const QuestionController = function(){

};
module.exports = {
  some : function(req, res, next) {
  	Question.some().then(function(question){
  		res.status(200).send(question); 
  	}).catch(function(e){
      res.status(500).send({ e : "Error"}); 
    });
  },
  check : function(req, res, next) {

  	var question = req.query.id;
  	var answer = req.query.answer;
  	return Question.findById(question)
  	.then(function(question){
  		if(question.checkAnswer(answer)){
  			GameService.score(req.gameContext);
  			res.status(200).send({ ok : "!" });
  		}else{
  			res.status(200).send( { error : "!" } );
  		}
  	}).catch(function(e){
  		console.log(e);
  		res.status(500).send(e);	
  	});

  }
};