const requireModule = require('../model/index').requireModule,
	  Question = requireModule("Question"),
	  questionSchema = require('mongoose').model("Question").schema;

function QuestionService() {
	var self = this;
	var questionPublicAPI = ["_id", "duration", "theme", "level", "difficulty", "answer", "description", "code", "options"];

	this.findById = function(id, user) {
		return Question.findOne({ _id: id, user: user._id}).then(function(question) {
			return extractPublicAPI(question);
		});
	};

	this.findAll = function(user) {
		return Question.find({}, questionPublicAPI.join(" "));
	}

	this.create = function(question, user) {
		var question = new Question(factoryQuestion(question));
		question.user = user;
		return question.save().then(function(){
			return extractPublicAPI(question);
		});
	};

	function extractPublicAPI(question) {
		return questionPublicAPI.reduce(function(publicAPI, property) {
			publicAPI[property] = question[property];
			return publicAPI;
		}, {});
	}

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