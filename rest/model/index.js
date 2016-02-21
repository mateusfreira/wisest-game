var mongoose = require('mongoose');
var dbUri = process.env.MONGO_URI || 'mongodb://192.168.1.10/wisest-game';

mongoose.connect(dbUri);

module.exports = {
	connection : mongoose.connection,
    requireModule : function(name){
        return require("./"+name);
    }
};
