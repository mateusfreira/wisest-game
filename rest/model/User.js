const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
	requireModule = require('./').requireModule,
	Score = requireModule('Score');


var UserSchema = new Schema({

	fb_id			: String,
	token			: String,
	email			: { type: String, required: true },
	first_name 		: { type: String, required: true },
	last_name 		: { type: String, required: true },
	password 		: { type: String, required: true },
	score 			: Number,
	created_at 		: { type: Date, default: Date.now },
	updated_at 		: { type: Date, default: null },
	scores 			: [{
						theme: {
							type: Schema.ObjectId,
							ref: 'Theme'
						},
						score: Number
					  }],
	levels 			: [{
						theme: {
							type: Schema.ObjectId,
							ref: 'Theme'
						},
						level: String
					  }],    
    badges 			: [{badge:{type: Schema.ObjectId,ref: 'Badge'}}],
});

UserSchema.methods.getThemeScore = function(theme) {
	this.scores = this.scores || [];
	return this.scores.filter(function(score) {
		return score.theme.toString() === theme.toString();
	}).shift();
};

UserSchema.methods.scoreTheme = function(themeId, question, mode, score) {
	var user = this;
	var themeScore = user.getThemeScore(themeId);

	var scoreBefore = themeScore ? themeScore.score : 0;
	themeScore = incrementScore(themeScore, user, themeId, score)
	var scoreAfter = themeScore.score;

	return user.save()
	.then(function() {
		return user.scoreLog(question._id, themeId, mode, true, scoreBefore, scoreAfter);
	})
	.then(function() {
		return themeScore.score;
	});
};

UserSchema.methods.getThemeLevel = function(theme) {

	this.levels = this.levels || [];
	return this.level;
	return this.levels.filter(function(level) {
		return level.theme.toString() === theme.toString();
	}).shift();
};

UserSchema.methods.upLevel = function(themeId, question, mode, score) {

	var user = this;
	var level = this.level;

	// var scoreBefore = themeScore ? themeScore.score : 0;
	// themeScore = incrementScore(themeScore, user, themeId, score)
	// var scoreAfter = themeScore.score;

	// return user.save()
	// .then(function() {
	// 	return user.scoreLog(question._id, themeId, mode, true, scoreBefore, scoreAfter);
	// })
	// .then(function() {
	// 	return themeScore.score;
	// });
};

function incrementScore(themeScore, user, themeId, score) {
	if (!themeScore) {
		themeScore = {
			theme: themeId,
			score: score
		};
		user.scores.push(themeScore);
	}else{
		themeScore.score += score;	
	}
	return themeScore;
}

UserSchema.methods.scoreLog = function(questionId, themeId, mode, hit, scoreBefore, scoreAfter) {
	return new Score({
		user: this._id,
		question: questionId,
		theme: themeId,
		mode: mode,
		hit : hit,
		scoreBefore: scoreBefore,
		scoreAfter: scoreAfter
	}).save();
};

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);