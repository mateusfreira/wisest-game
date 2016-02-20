module.exports = function(app) {
  var Game = app.controllers.Game;
  app.get('/game/start',
    Game.start
  );
  app.post('/game/start',
    Game.start
  );
  app.post('/game/next',
    Game.next
  );
  app.post('/game/checkAnswer',
    Game.checkAnswer
  );
};