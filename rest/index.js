(function() {
  const express = require('express');
  const load = require('express-load');
  const session = require('express-session');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const db = require('./model').connection;
  const mongoSession = require('connect-mongodb-session')(session);


  const app = express();
  app.passport = require('passport');
  app.strategies = require('./configs/passport')(app.passport);

  const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }
  app
    .use(session({
      resave: false ,
      httpOnly: true,
      maxAge: 10000,
      store: new mongoSession({ 
        uri: 'mongodb://localhost/wisest-game',
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
    //.use(cookieParser());

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