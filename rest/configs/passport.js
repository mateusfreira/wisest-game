var requireModule = require('../model/index').requireModule; 
const User = requireModule("User");
const configAuth = require("./auth");
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){
        
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        // process.nextTick(function() {

            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                
                if (err)
                    return done(err);

                
                if (user) {
                    
                    return done(null, user); 
                } else {
                    var newUser            = new User();
                    
                    newUser.id    = profile.id; // set the users id
                    newUser.token = token; // we will save the token that provides to the user
                    // newUser.name  = profile.name.displayname
                    // newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first                    

                    newUser.save(function(err) {
                        if (err)
                            throw err;                        
                        return done(null, newUser);
                    });
                }

            });
        // });

    }));
}