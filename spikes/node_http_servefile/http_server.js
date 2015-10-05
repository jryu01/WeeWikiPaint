'use strict';

var fs = require('fs');
var http = require('http');
var server = http.createServer();

server.on('request', function (req, res) {
  console.log('Received request');

  fs.readFile('./file.html', function (err, data) {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
    res.statusCode = 200;
    res.end(data);
  });
});

server.listen(8080);
console.log('server started');