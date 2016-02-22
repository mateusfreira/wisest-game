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

module.exports = mongoose.model('Game', GameSchema);