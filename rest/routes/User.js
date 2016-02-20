module.exports = function(app,passport) {
  var User = app.controllers.User;
  app.get('/user/auth/facebook',
    app.passport.authenticate('facebook', { scope : 'email' })
  );
  
  app.get('/auth/facebook/callback',
    app.passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/error'
        })); 
        
   app.post('/user/signup', 
        app.passport.authenticate('local-signup',
            {
                successRedirect : '/success', 
                failureRedirect : '/failure', 
                failureFlash : true 
            }
    ));
    
    app.get('/success',function(req,res) { res.json({satus:'success'}) });

    app.get('/failure',function(req,res) { res.json({satus:'failure'}); });
      
   
};