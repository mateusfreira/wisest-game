module.exports = function(app) {
  var Game = app.controllers.Game;
  var User = app.controllers.User;
  app.post('/game/start', Game.start)
     .post('/game/next', Game.next)
     .post('/game/checkAnswer', Game.checkAnswer)
     .get('/game/getThemeScore', Game.getThemeScore)
     .get('/game/getThemeLevel', Game.getThemeLevel);
};