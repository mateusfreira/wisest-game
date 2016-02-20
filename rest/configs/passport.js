var requireModule = require('../model/index').requireModule;
 
const User = requireModule("User");
const configAuth = require("./auth");
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){
    
    passport.use(new FacebookStrategy({
    
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },
     function(token, refreshToken, profile, done) {
                 
        process.nextTick(function() {
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                if (err)
                    return done(err);

                if (user) {
                    
                    return done(null, user);
                } else {
                    
                    var newUser  = new User();
                    
                    newUser.id    = profile.id; 
                    newUser.token = token; 
                    newUser.name  = profile.name.givenName + ' ' + profile.name.familyName;
                    // newUser.email = profile.emails[0].value;   
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
}