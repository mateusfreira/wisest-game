module.exports = function(app,passport) {
  var User = app.controllers.User;
  app.get('/user/auth/facebook',
    app.passport.authenticate('facebook', { scope : 'email' })
  );
  
  app.get('/user/auth/facebook/callback',
    app.passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/error',
            scope:['email']
        })); 
      
   app.post('/user/signup', 
        app.passport.authenticate('local-signup'),
            function(req,res){
              res.json({status: 'success'});
            }            
    );

   app.post('/user/login', 
      app.passport.authenticate('local-login'),
       function(req,res){
        res.json({status: 'success'});
       }
    );
      
   
};