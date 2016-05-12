var config = require('./config.js'); // todo replace with nconf

var paypal = require('./paypal.js');
paypal.configure(config.paypal);

var restify = require('restify');
var server = restify.createServer();
server.use(restify.queryParser({ mapParams: false }));
server.use(restify.bodyParser({ mapParams: false }));

server.post('/logins', function(req, res, next) {
  if (req.body.type === 'paypal') {
    res.json({ code: req.body.credentials.code });
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
