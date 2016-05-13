var config = require('./config.js'); // todo replace with nconf

var paypal = require('paypal-rest-sdk');
paypal.configure(config.paypal);

var restify = require('restify');
var server = restify.createServer();
server.use(restify.queryParser({ mapParams: false }));
server.use(restify.bodyParser({ mapParams: false }));

server.post('/logins', function(req, res, next) {
  if (req.body.type === 'paypal') {
    paypal.openIdConnect.tokeninfo.create(req.body.credentials.code, function(err, tokeninfo) {
      if (err) {
        res.json(500, {
          step: 'paypal.openIdConnect.tokeninfo.create',
          message: err.message
        });
      } else {
        paypal.openIdConnect.userinfo.get(tokeninfo.access_token, function(err, userinfo) {
          if (err) {
            res.json(500, {
              step: 'paypal.openIdConnect.userinfo.get',
              message: err.message
            });
          } else {
            res.json({
              code: req.body.credentials.code,
              tokeninfo: tokeninfo,
              userinfo: userinfo
            });
          }
        });
      }
    });
  } else {
    res.header('Location', '/index.html');
    res.status(401);
  }
  return next();
});

// Try to serve a static HTML file if no other path has matched
server.get(/\/?.*/, restify.serveStatic({
  directory: __dirname,
  match: /^.*[A-Za-z]+.html.*$/
}));

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
