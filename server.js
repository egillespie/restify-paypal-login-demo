var config = require('./config.js'); // todo replace with nconf

var q = require('q');

var paypal = require('paypal-rest-sdk');
paypal.configure(config.paypal);

var restify = require('restify');
var server = restify.createServer();
server.use(restify.queryParser({ mapParams: false }));
server.use(restify.bodyParser({ mapParams: false }));

server.post('/logins', (req, res, next) => {
  if (req.body.type === 'paypal') {
    q.nfcall(paypal.openIdConnect.tokeninfo.create, req.body.credentials.code)
    .then((tokeninfo) => {
      return q.nfcall(paypal.openIdConnect.userinfo.get, tokeninfo.access_token)
        .then((userinfo) => {
          res.json({ tokeninfo: tokeninfo, userinfo: userinfo });
        });
    }).fail((err) => {
      res.json(500, { message: err.message });
    }).done();
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

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
