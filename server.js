var restify = require('restify');

var server = restify.createServer();

server.use(restify.queryParser({ mapParams: false }));

server.get('/auth/paypal/response', function(req, res, next) {
  console.log(req.query);
  res.json({ code: req.query.code });
  return next();
});

// Try to serve a static HTML file if no other path has matched
server.get(/\/?.*/, restify.serveStatic({
  directory: __dirname,
  match: /^.*index.html.*$/
}));

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
