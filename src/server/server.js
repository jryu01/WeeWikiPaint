'use strict';

var http = require('http');
var server = http.createServer();

server.on('request', function (req, res) {
  var body = 'Hello World';
  res.end(body);
});

exports.start = function (portNumber) {
  if (!portNumber) { throw new Error('port number is required'); }
  server.listen(portNumber);
};

exports.stop = function () {
  server.close();
};