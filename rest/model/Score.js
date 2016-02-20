var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ScoreSchema = new Schema({
	theme  		: [{ type: Schema.ObjectId, ref: 'Theme' }],
	question  	: [{ type: Schema.ObjectId, ref: 'Question' }],
	user 		: [{ type: Schema.ObjectId, ref: 'User' }], 
	answer 		: String,
	hit 		: Boolean,
	scoreBefore	: Number,
	scoreAfter	: Number,
	created_at	: Date
});


var Score = mongoose.model('Score', ScoreSchema);
module.exports = Score;