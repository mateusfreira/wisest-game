var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ThemeSchema = new Schema({
	name: String,
	created_at: Date
});

var Theme = mongoose.model('Theme', ThemeSchema);

module.exports = Theme;