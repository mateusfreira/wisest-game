module.exports = {
	reponseWithPromise: function(promise, res) {
		return promise.then(function(result) {
			res.status(200).send(result);
		}).catch(function(error) {
			res.status(500).send({
				error: error
			});
		});
	}
};