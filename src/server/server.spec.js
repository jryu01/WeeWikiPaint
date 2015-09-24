'use strict';

var expect = require('chai').expect,
    server = require('./server'),
    http = require('http');

describe('Http server', function () {

  var PORT_NUM = 3000;

  before(function () {
    server.start(PORT_NUM);
  });
  after(function () {
    server.stop();
  });

  it('should respond HelloWorld', function (done) {
    var request = http.get('http://localhost:' + PORT_NUM );

    request.on('response', function (res) {

      var data = '';

      expect(res.statusCode).to.equals(200);

      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        expect('Hello World').to.equals(data);
        done();
      });
    });
  });
});