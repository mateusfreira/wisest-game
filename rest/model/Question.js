var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: String,
  description: String,
  options: Array,
  status: Number,
  created_at: Date,
  updated_at: Date
});
var Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
