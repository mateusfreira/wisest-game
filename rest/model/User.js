var mongoose = require('mongoose'),
bcrypt   = require('bcrypt-nodejs'),
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

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', UserSchema);
module.exports = User;
