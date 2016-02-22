var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ModeSchema = new Schema({
	name: { type: String, required: true },
	isSingle: { type: Boolean, default: false },
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mode', ModeSchema);