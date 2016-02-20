var requireModule = require('../model/index').requireModule; 
const User = requireModule("User");
const configAuth = require("./auth");
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy   = require('passport-local').Strategy;

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
        callbackURL     : configAuth.facebookAuth.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                
                if (err)
                    return done(err);

                
                if (user) {
                    
                    return done(null, user); 
                } else {
                    var newUser            = new User();
                    
                    newUser.id    = profile.id; 
                    newUser.token = token; 
                    newUser.name  = profile.displayName;
                    // newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
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

            console.log("USER");
            console.log(user);
            if (user) {
                    console.log("JA EXISTE");
                    console.log(user);
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                
            
                var newUser  = new User();                
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                        
                            console.log("SAVE");
                            console.log(user);
                    return done(null, newUser);
                });
            }
        });    

        });
    }));
}