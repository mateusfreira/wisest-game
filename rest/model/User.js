const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    bcrypt   = require('bcrypt-nodejs'),
	requireModule = require('./').requireModule,
	Score = requireModule('Score');


var UserSchema = new Schema({

	fb_id: String,
	token: String,
	email: String,
	first_name: String,
	last_name: String,
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
	return this.scores.filter(function(score) {
		return score.theme.toString() === theme.toString();
	})[0];
};
UserSchema.methods.scoreTheme = function(themeId, question, score) {
	try{
	const user = this;
	var scoreBefore = 0;
	var scoreAfter;
	var themeScore = user.getThemeScore(themeId);
	if (!themeScore) {
		themeScore = {
			theme: themeId,
			score: score
		};
		user.scores.push(themeScore);
	}else{
		scoreBefore = themeScore.score;
		themeScore.score += score;	
	}
	scoreAfter = themeScore.score;
	return user.save().then(function() {
		new Score({
			user: user._id,
			hit : true,
			questions: question,
			scoreBefore: scoreBefore,
			scoreAfter: scoreAfter
		}).save();
	});
}catch(e){console.log(e)}
};
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);
module.exports = User;