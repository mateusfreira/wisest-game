module.exports = function(app, passport) {
  var User = app.controllers.User;

  app.route('/user/current').get(User.current);
  
  app
    .publicRoute('/user/auth/facebook')
    .get(
      app.passport.authenticate('facebook', {
        scope: 'email'
      })
    );

  app
    .publicRoute('/user/auth/facebook/callback')
    .get(
      app.passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/error',
        scope: ['email']
      })
    );

  app
    .publicRoute('/user/signup')
    .post(
      app.passport.authenticate('local-signup'),
      function(req, res) {
        res.json({
          status: 'success'
        });
      }
    );

  app
    .publicRoute('/user/login')
    .post(
      app.passport.authenticate('local-login'),
      function(req, res, user) {
        res.json({
          status: 'success',
          scores: req.user.scores,
          first_name: req.user.first_name
        });
      }
    );
};