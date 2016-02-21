const requireModule = require('../model/index').requireModule,
	Question = requireModule("Question"),
	questionSchema = require('mongoose').model("Question").schema,
	_ = require('lodash');

function QuestionService() {
	var self = this;
	var questionPublicAPI = ["_id", "duration", "theme", "level", "difficulty", "answer", "description", "code", "options"];


	this.nextQuestion = function(user) {
		return Question.someToApprove(user._id)
			.then(function(question) {
				return {
					_id: question._id,
					description: question.description,
					code: question.code,
					duration: question.duration,
					options: question.options
				};
			});
	};
	this.ideverythingOk = function(id, user) {
		console.log(id);
		return Question.findOne({
			_id: id
		}).then(function(question) {
			question.addReviewer(user, true);
		}).then(function() {
			return {
				status: "Ok"
			};
		});
	};

	this.findById = function(id, user) {
		return Question.findOne({
			_id: id
		});
	};

	this.findAll = function(user) {
		return Question.find({
			user: user._id
		}, questionPublicAPI.join(" "));
	}

	this.create = function(question, user) {
		var question = new Question(factoryQuestion(question));
		question.user = user;
		return question.save().then(function() {
			return self.extractPublicAPI(question);
		});
	};

	this.update = function(question, data, user) {
		question = _.extend(question, data);
		console.log("User",user, question);
		if (user._id.toString() == question.user.toString()) {
			return question.save().then(function() {
				return self.extractPublicAPI(question);
			});
		} else {
			return Promise.reject("This user can't edit this question!");
		}
	};

	this.extractPublicAPI = function(question) {
		return questionPublicAPI.reduce(function(publicAPI, property) {
			publicAPI[property] = question[property];
			return publicAPI;
		}, {});
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