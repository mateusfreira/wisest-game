var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var LevelSchema = new Schema({

	xp_level	: { type: Number, default: 1 },
	next_level	: { type: Number, default: 1 },
	user 		: { type: Schema.ObjectId, ref: 'User' },	
	created_at	: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Level', LevelSchema);