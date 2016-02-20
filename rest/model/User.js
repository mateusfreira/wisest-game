const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    bcrypt   = require('bcrypt-nodejs'),
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
UserSchema.methods.getThemeScore = function(theme) {
	this.scores = this.scores || [];
	var themeScore = this.scores.filter(function(score) {
		return score.theme === theme;
	})[0];
	if (!themeScore) {
		themeScore = {
			theme: theme,
			score: 0
		};
		user.scores.push(themeScore);
	}
	return themeScore;
};
UserSchema.methods.scoreTheme = function(theme, question, score) {
	const user = this;
	var themeScore = user.getThemeScore(theme);
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
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);
module.exports = User;