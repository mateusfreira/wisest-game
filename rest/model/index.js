<<<<<<< Updated upstream
var mongoose = require('mongoose'),
    dbUri = process.env.MONGO_URI || 'mongodb://192.168.1.10/wisest-game';
    
=======
var mongoose = require('mongoose');
var dbUri = process.env.MONGO_URI || 'mongodb://localhost/wisest-game';
>>>>>>> Stashed changes
mongoose.connect(dbUri);

module.exports = {
	connection : mongoose.connection,
    requireModule : function(name){
        return require("./"+name);
    }
};
