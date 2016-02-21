var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ScoreSchema = new Schema({
	theme  		: { type: Schema.ObjectId, ref: 'Theme' },
	question  	: { type: Schema.ObjectId, ref: 'Question' },
	user 		: { type: Schema.ObjectId, ref: 'User' },
	mode 		: { type: Schema.ObjectId, ref: 'Mode' },
	answer 		: String,
	hit 		: { type: Boolean, required: true },
	scoreBefore	: { type: Number, required: true },
	scoreAfter	: { type: Number, required: true },
	created_at	: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Score', ScoreSchema);