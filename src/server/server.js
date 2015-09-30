'use strict';

var http = require('http'), 
    fs = require('fs'),
    server = http.createServer();

var serveFile = function (response, file) {
  fs.readFile(file, function (err, data) {
    if (err) { throw err; }
    response.end(data);
  });
};

exports.start = function (homePage, notFoundPage, portNumber, callback) {
  if (!homePage) { throw new Error('A file to serve is required'); }
  if (!notFoundPage) { throw new Error('404 file to serve is required'); }
  if (!portNumber) { throw new Error('port number is required'); }
  
  server.on('request', function (req, res) {
    if (req.url === '/' || req.url === '/index.html') {
      res.statusCode = 200;
      serveFile(res, homePage);
    } else {
      res.statusCode = 404;
      serveFile(res, notFoundPage);
    }
  });

  server.listen(portNumber, callback);
};

exports.stop = function (cb) {
  server.close(cb);
};