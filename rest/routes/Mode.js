module.exports = function(app) {
  var Mode = app.controllers.Mode;
  app.get('/modes', Mode.findAll);
};