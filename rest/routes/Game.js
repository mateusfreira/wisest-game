module.exports = function(app) {
  var Game = app.controllers.Game;
  app.get('/game/start', Game.start)
     .post('/game/start', Game.start)
     .post('/game/next', Game.next)
     .post('/game/checkAnswer', Game.checkAnswer)
     .get('/game/getThemeScore', Game.getThemeScore);
};