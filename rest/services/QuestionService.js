const requireModule = require('../model/index').requireModule,
	  Question = requireModule("Question"),
	  questionSchema = require('mongoose').model("Question").schema;

function QuestionService() {
	var self = this;

	this.create = function(question, user) {
		var question = new Question(factoryQuestion(question));
		question.user = user;
		return question.save().then(function(){
			return {
				_id: question._id,
				duration: question.duration,
				theme: question.theme,
				difficulty: question.difficulty,
				answer:question.answer,
				description: question.description,
				code: question.code,
				options: question.options
			};
		});
	};

	function factoryQuestion(question) {
		return {
			duration: question.duration || questionSchema.paths.duration.defaultValue,
			theme: question.theme,
			level: question.level,
			difficulty: question.difficulty,
			answer: question.answer,
			description: question.description,
			code: question.code,
			options: question.options
		};
	}
	
};

module.exports = new QuestionService();