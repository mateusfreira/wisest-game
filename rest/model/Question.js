var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	requireModule = require('./').requireModule,
	Score = requireModule('Score');

var QuestionSchema = new Schema({
	description	: { type: String, required: true },
	code    	: String,
	theme  		: { type: Schema.ObjectId, ref: 'Theme', required: true },
	user  		: { type: Schema.ObjectId, ref: 'Theme' },
	options		: { type: Array, required: true },
	answer 		: { type: String, required: true },
	level		: { type: Schema.ObjectId, ref: 'Theme' },// required: true },
	difficulty	: { type: Number, required: true },
	duration	: { type: Number, default: 30000, required: true },
	approved	: { type: Boolean, default: false },
	approvedBy	: [{ type: Schema.ObjectId, ref: 'Theme' }],
	created_at	: { type: Number, default: Date.now },
	updated_at	: Date
});

QuestionSchema.methods.checkAnswer = function(answer) {
	return this.answer === answer;
};

QuestionSchema.statics.some = function(user, theme) {
	var self = this;
	var questionToNotDisplay = [];
	return Score.find({
			user: user,
			hit : true
		}, "question").then(function(scores) {
			return scores.map(function(score) {
				return score.question;
			});
		})
		.then(function(_questionToNotDisplay) {
			questionToNotDisplay = _questionToNotDisplay;
			return self.count({
				theme: theme,
				"_id": {
					$nin: questionToNotDisplay
				}
			});
		})
		.then(function(count) {
			return self.findOne({
					theme: theme,
					"_id": {
						$nin: questionToNotDisplay
					}

				})
				.skip(Math.floor(Math.random() * count));
		}).catch(function(e) {
			console.log(e);
		});
};

QuestionSchema.statics.checkAnswerById = function(id, answer) {
	var self = this;
	return self.findById(id)
		.then(function(question) {
			return question.checkAnswer(answer);
		});
}

module.exports = mongoose.model('Question', QuestionSchema);