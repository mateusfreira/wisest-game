var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BadgesSchema = new Schema({

	title		: { type: String },
	xp			: { type: Number, default: 1 },	
	created_at	: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Level', BadgeSchema);