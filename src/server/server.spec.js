'use strict';

var expect = require('chai').expect,
    server = require('./server'),
    http = require('http');

describe('Http server', function () {

  before(function () {
    server.start();
  });
  after(function () {
    server.stop();
  });

  it('should response correctly', function (done) {
    http.get('http://localhost:8080', function (res) {
      var body = '<html><head>Node HTTP Spike</head>' +
            '<body><p>This is a spike of Node\'s HTTP Serve</p></body></html>';
      var data = '';

      expect(res.statusCode).to.equals(200);

      res.on("data", function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        expect(body).to.equals(data);
        done();
      });
      res.on('close', done);
    }).on('error', done);
  });
});