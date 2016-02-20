module.exports = function(app) {
  var Game = app.controllers.Game;
  app.get('/game/start',
    Game.start
  );
  app.get('/game/session',
    Game.session
  );  
};