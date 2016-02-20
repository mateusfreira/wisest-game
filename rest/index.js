(function(){
  var express = require('express');
  var app = express();
  var load = require('express-load');
  var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
  }
  app.use(allowCrossDomain);
  app.get('/', function (req, res) {
    res.send('!');
  });
  load('controllers')
  .then('routes')
  .into(app);
  var server = app.listen(process.env.port || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server started http://%s:%s', host, port);
  });
})();