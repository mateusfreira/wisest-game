module.exports = function(app) {
  var Theme = app.controllers.Theme;
  app.get('/themes',
    Theme.findAll
  );
};