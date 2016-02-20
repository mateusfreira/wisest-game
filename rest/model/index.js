var mongoose = require('mongoose');
var dbUri = process.env.MONGO_URI || 'mongodb://localhost/wisest-game';
mongoose.connect(dbUri);
module.exports = {
    requireModule : function(name){
        return require("./"+name);
    }
};
