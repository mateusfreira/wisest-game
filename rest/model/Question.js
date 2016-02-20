var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  description: String,
  options: Array,
  answer : String,
  status: Number,
  created_at: Date,
  updated_at: Date
});

QuestionSchema.methods.checkAnswer = function(answer){
	return this.answer === answer;
};
var Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;