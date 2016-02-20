module.exports = function(app) {
  var Game = app.controllers.Game;
  app.post('/game/start',
    Game.start
  );
  app.get('/game/session',
    Game.session
  );
  app.post('/game/next',
    Game.next
  );
  app.post('/game/checkAnswer',
    Game.checkAnswer
  );
};