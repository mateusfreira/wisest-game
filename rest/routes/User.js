module.exports = function(app,passport) {
  var User = app.controllers.User;
  app.get('/user/auth/facebook',
    app.passport.authenticate('facebook', { scope : 'email' })
  );
  
  app.get('/user/auth/facebook/callback',
    app.passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/error'
        }));    
};