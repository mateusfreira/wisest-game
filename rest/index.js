(function() {
  const express = require('express');
        load = require('express-load'),
        session = require('express-session'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        db = require('./model').connection,
        mongoSession = require('connect-mongodb-session')(session),
        app = express();

  app.passport = require('passport');
  app.strategies = require('./configs/passport')(app.passport);

  app.publicRoutes = [];
  app.publicRoute = function(route) {
    if (app.publicRoutes.indexOf(route) === -1) {
      app.publicRoutes.push(route);
    }
    return app.route(route);
  }

  const allowCrossDomain = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
  }

  const hasAccess = function(req, res, next) {
    console.log();
    if (req.user || app.publicRoutes.indexOf(req.url) !== -1  || req.method === 'OPTIONS') {
      next();
    } else {
      res.status(403).send({ error: "Access denied." });
    }
  }

  app
    .use(session({
      resave: false ,
      httpOnly: true,
      maxAge: 10000,
      store: new mongoSession({
        uri: 'mongodb://192.168.1.10/wisest-game',
        collection: 'wisest-sessions'
      }),
      saveUninitialized: false,
      secret: 'nice-game',
      key: 'yep!',
      cookie: {
        //secure: true @todo see this here
      }
    }))
    .use(allowCrossDomain)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(app.passport.initialize())
    .use(app.passport.session())
    .use(hasAccess);
    //.use(cookieParser());

  app.passport.serializeUser(function(user, done) {
    done(null, user);
  });

  app.passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  app.get('/', function(req, res) {
    res.send('!');
  });

  load('controllers')
    .then('routes')
    .into(app);

  var server = app.listen(process.env.port || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server started http://%s:%s', host, port);
  });

})();