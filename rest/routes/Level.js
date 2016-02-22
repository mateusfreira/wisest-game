module.exports = function(app) {
  var Level = app.controllers.Levels;
  app.get('/levels', Level.findAll);
};