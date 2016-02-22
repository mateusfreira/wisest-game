var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var GameSchema = new Schema({
	theme  		: { type: Schema.ObjectId, ref: 'Theme', required: true },
	mode 		: { type: Schema.ObjectId, ref: 'Mode', required: true },
	players		: [{
		user: { type: Schema.ObjectId, ref: 'User', required: true },
		score:{ type: Number, default: 0, required: true }
	}],
	inProgress  : { type: Boolean, default: false },
	owner 		: { type: Schema.ObjectId, ref: 'User', required: true },
	created_at	: { type: Number, default: Date.now, required: true }
});


GameSchema.methods.getPlayerScore = function(userId) {
	this.players = this.players || [];
	return this.players.filter(function(player) {
		return player.user.toString() === userId.toString();
	}).shift();
};

GameSchema.methods.scorePlayer = function(userId, score) {
	var userScore = this.getPlayerScore(userId);
	userScore.score = (userScore.score || 0) + score;
	return this.save();
};

module.exports = mongoose.model('Game', GameSchema);