var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	description	: { type: String, required: true },
	code    	: String,
	theme  		: { type: Schema.ObjectId, ref: 'Theme', required: true },
	options		: { type: Array, required: true },
	answer 		: { type: String, required: true },
	status		: { type: Number, default: 1 },
	created_at	: { type: Number, default: Date.now },
	updated_at	: Date
});

QuestionSchema.methods.checkAnswer = function(answer) {
	return this.answer === answer;
};

QuestionSchema.statics.some = function(user, theme) {
	var self = this;
	return self.count()
		.then(function(count) {
			return self.findOne({
							theme : theme
						})	
					   .skip(Math.floor(Math.random() * count));
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