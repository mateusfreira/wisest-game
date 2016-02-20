const requireModule = require('../model/index').requireModule, 
      User = requireModule("User"),
      configAuth = require("./auth"),
      FacebookStrategy = require('passport-facebook').Strategy,
      LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport){
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
        
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   : ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            User.findOne({ 'id' : profile.id }, function(err, user) {
                
                if (err){
                    return done(err);
                }

                
                if (user) {
                    return done(null, user); 
                } else {

                    var newUser = new User();                    
                    newUser.fb_id = profile.id; 
                    newUser.token = token; 
                    newUser.first_name = profile._json.first_name;
                    newUser.last_name = profile._json.last_name;
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    console.log(profile);                    

                    newUser.save(function(err) {
                        if (err)
                            throw err;                        
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
    
    passport.use('local-signup', new LocalStrategy({        
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        
        process.nextTick(function() {

        User.findOne({ 'email' :  email }, function(err, user) {
            
            if (err)
                return done(err);            
            if (user) {                    
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                //chao
                var newUser  = new User();                
                newUser.email    = email;
                console.log(req.body);
                newUser.password = newUser.generateHash(password);
                newUser.first_name = req.body.first_name;
                newUser.last_name = req.body.last_name;
                newUser.save(function(err) {
                    if (err)
                        throw err;                        
                    return done(null, newUser);
                });
            }
        });    

        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },

    function(req, email, password, done) { 

        
        User.findOne({ 'email' :  email }, function(err, user) {
        
            if (err){
                return done(err);
            }

            if (!user){
                return done(null, false, req.flash('loginMessage', 'No user found.')); 
            }
        
            if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }
            
            return done(null, user);
        });

    }));
}