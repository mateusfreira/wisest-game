var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ModeSchema = new Schema({
	name: String,
	created_at: Date
});

var Mode = mongoose.model('Mode', ModeSchema);

module.exports = Mode;