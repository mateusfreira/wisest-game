const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	requireModule = require('./').requireModule,
	Score = requireModule('Score');

var UserSchema = new Schema({

	id: String,
	token: String,
	email: String,
	name: String,
	password: String,
	score: Number,
	created_at: Date,
	updated_at: Date,
	scores: [{
		theme: {
			type: Schema.ObjectId,
			ref: 'Theme'
		},
		score: Number
	}]
});
UserSchema.methods.scoreTheme = function(theme, question, score) {
	const user = this;
	user.scores = user.scores || [];
	var themeScore = user.scores.filter(function(score) {
		return score.theme === theme;
	})[0];
	if (!themeScore) {
		themeScore = {
			theme: theme,
			score: 0
		};
		user.scores.push(themeScore);
	}
	var scoreBefore;
	var scoreAfter;
	scoreBefore = themeScore.score;
	themeScore.score += score;
	scoreAfter = themeScore.score;
	return user.save().then(function() {
		new Score({
			user: user._id,
			questions: question,
			scoreBefore: scoreBefore,
			scoreAfter: scoreAfter
		}).save();
	});
};
var User = mongoose.model('User', UserSchema);
module.exports = User;