const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs'),
	requireModule = require('./').requireModule,
	Score = requireModule('Score')
Level = requireModule('Level')
LEVEL_OK = "OK"
LEVEL_NEEDS_TO_UP = "UP";
LEVEL_NEEDS_TO_DOWN = "DOWN";


var UserSchema = new Schema({

	fb_id: String,
	token: String,
	email: {
		type: String,
		required: true
	},
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: null
	},
	scores: [{
		theme: {
			type: Schema.ObjectId,
			ref: 'Theme'
		},
		level: {
			type: Schema.ObjectId,
			ref: 'Level'
		},
		score: Number
	}],
	badges: [{
		badge: {
			type: Schema.ObjectId,
			ref: 'Badge'
		}
	}],
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

	return incrementScore(themeScore, user, themeId, score).then(function(themeScore) {
		var scoreAfter = themeScore.score;
	
		return user.scoreLog(question._id, themeId, mode, true, scoreBefore, scoreAfter)
			.then(function() {
			
				return themeScore;
			});
	})

};


UserSchema.methods.getUserLevel = function(theme) {

	var promiseResult;
	var themeScore = this.getThemeScore(theme);
	if (themeScore) {
		promiseResult = Level.findById(themeScore.level, '_id name xp_level nex_level');
	} else {
		promiseResult = Promise.reject("no level for theme");
	}
	return promiseResult;
};



function incrementScore(themeScore, user, themeId, score) {
	var promiseResult;
	if (!themeScore) {
		themeScore = {
			theme: themeId,
			score: score,
			level: "56c9a885738db6ce8f303f90"
		};

		user.scores.push(themeScore);
		promiseResult = user.save();
	} else {
		themeScore.score += score;
		promiseResult = updateLevel(user, themeScore);
	}
	return promiseResult.then(function() {

		return themeScore;
	});
}

function setRigthLevel(user, themeScore) {
	return Level
		.findOne({
			xp_level: {
				$lt: themeScore.score
			},
			next_level: {
				$gte: themeScore.score
			}
		}).then(function(level) {

			themeScore.level = level._id;
		
			return user.save().then(function(){
			
			});
		});
}

function updateLevel(user, themeScore) {
	return checkLevel(themeScore, user)
		.then(function(checkResult) {
			if (checkResult != LEVEL_OK) {
				return setRigthLevel(user, themeScore);
			}
		});
}

function checkLevel(themeScore, user) {

	return user.getUserLevel(themeScore.theme).then(function(currentLevel) {
		var checkResult;
		if (currentLevel.next_level <= themeScore.score) {
			checkResult = LEVEL_OK;
		} else {
			checkResult = LEVEL_NEEDS_TO_UP;
		}
		return checkResult;
	});
}

UserSchema.methods.scoreLog = function(questionId, themeId, mode, hit, scoreBefore, scoreAfter) {
	return new Score({
		user: this._id,
		question: questionId,
		theme: themeId,
		mode: mode,
		hit: hit,
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