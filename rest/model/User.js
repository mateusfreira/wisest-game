var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
    
    id           : String,
    token        : String,
    email        : String,
    name         : String,
    password     : String,
    created_at: Date,
    updated_at: Date
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
