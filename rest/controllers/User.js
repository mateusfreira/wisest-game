var requireModule = require('../model/index').requireModule;

module.exports = {
  facebook : function(req, res, next) {
  	const User = requireModule("User");
  	User.find().then(function(user){
  		res.status(200).send(user);	
  	});
  }
};