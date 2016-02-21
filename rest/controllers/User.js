const requireModule = require('../model/index').requireModule,
      User = requireModule("User"),
      reponseWithPromise = require('./Utility').reponseWithPromise;
      
module.exports = {
  current: function(req, res) {  	
    res.status(200).send({ first_name : req.user.first_name, id : req.user._id });
  },
  logout : function(req, res){
  	req.session.destroy();
  	res.status(200).send({ status : "ok"});
  }
};