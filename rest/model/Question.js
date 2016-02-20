var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	description: String,
	options: Array,
	answer: String,
	status: Number,
	created_at: Date,
	updated_at: Date
});

QuestionSchema.methods.checkAnswer = function(answer) {
	return this.answer === answer;
};

QuestionSchema.statics.some = function(context) {
	var self = this;
	return self
			.count()
			.then(function(count) {
				var random = Math.floor(Math.random() * count);
				return self.findOne().skip(random);
			});
};

var Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;