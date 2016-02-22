const requireModule = require('../model/index').requireModule,
    User = requireModule("User"),
    configAuth = require("./auth"),
    FacebookStrategy = require('passport-facebook').Strategy,
    LocalStrategy = require('passport-local').Strategy;

function Passport(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            done(null, user);
        }).catch(function(err) {
            done(err);
        });
    });
    const facebookCallback = function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({
                'id': profile.id
            }).then(function(user) {
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    newUser.fb_id = profile.id;
                    newUser.token = token;
                    newUser.first_name = profile._json.first_name;
                    newUser.last_name = profile._json.last_name;
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    return newUser.save().then(function() {
                        return done(null, newUser);
                    });
                }

            }).catch(function(err) {
                return done(err);
            });
        });
    };
    const localCallback = function(req, email, password, done) {

        process.nextTick(function() {
            User.findOne({
                'email': email
            }).then(function(user) {
                if (user) {
                    console.log("NEW USER",done);
                    done('That email is already taken.', false);                    
                } else {

                    var newUser = new User();                    
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.first_name = req.body.first_name;
                    newUser.last_name = req.body.last_name;
                    return newUser.save().then(function() {
                        return done(null, newUser);
                    });
                }
            }).catch(function(err) {
                console.log(err);
                return err;
            });

        });
    };
    passport.use(new FacebookStrategy({
            // pull in our app id and secret from our auth.js file
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
        },
        facebookCallback
    ));
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, localCallback));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            User.findOne({
                'email': email
            }).then(function(user) {
                console.log(email, user);
                if (!user) {
                    done('Incorrect username.', false);
                } else if (!user.validPassword(password)) {
                    done('Oops! Incorrect password.', false);
                } else {
                    done(null, user);
                }
            }).catch(function(err) {
                return done(err);
            });

        }));
};
module.exports = Passport;