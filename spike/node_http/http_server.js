'use strict';

var http = require('http');
var server = http.createServer();

server.on('request', function (req, res) {
  console.log('Received request');

  var body = '<html><head>Node HTTP Spike</head>' +
            '<body><p>This is a spike of Node\'s HTTP Serve</p></body></html>';

  res.end(body);
});

exports.start = function () {
  server.listen(8080);
  console.log('server started');
};