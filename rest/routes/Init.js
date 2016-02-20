module.exports = function(app) {
  var Init = app.controllers.Init;
  app.get('/init',
    Init.init
  );
};