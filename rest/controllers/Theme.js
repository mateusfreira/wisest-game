const requireModule = require('../model/index').requireModule;
const Theme = requireModule("Theme");
module.exports = {
	findAll: function(req, res, next) {
		Theme.find().then(function(themes) {
			res.status(200).send(themes);
		}).catch(function(err) {
			res.status(500).send({
				error: err
			});
		});
	}
};