var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ThemeSchema = new Schema({
	name: { type: String, required: true },
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Theme', ThemeSchema);