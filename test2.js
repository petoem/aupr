var express = require('express');
var app = express();
var aupr = require('./aupr.js');

aupr.parseAuthData([{name: 'MariaUshiromiya', pass: 'beatrice', permission: {read: true, write: false}},{name: 'EnmaAi', pass: 'revenge', permission: {read: true, write: true}}]);

app.use(aupr.auth);

app.get('/', function (req, res) {
  res.write('<h1>Access granted</h1>');
  res.end('<p>' + JSON.stringify(req.authenticatedUser) + '</p>');
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('TestServer listening at http://%s:%s', host, port);
});