'use strict';

var http = require('http'), 
    fs = require('fs'),
    server = http.createServer();

var file ='generated/test/test.html';

exports.start = function (file, portNumber) {
  if (!file) { throw new Error('A file to serve is required'); }
  if (!portNumber) { throw new Error('port number is required'); }
  
  server.on('request', function (req, res) {
    fs.readFile(file, function (err, data) {
      res.end(data);
    });
  });

  server.listen(portNumber);
};

exports.stop = function (cb) {
  server.close(cb);
};