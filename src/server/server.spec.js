'use strict';

var expect = require('chai').expect,
    server = require('./server'),
    http = require('http'),
    fs = require('fs');

describe('Http server', function () {

  var PORT_NUM = 3000;

  afterEach(function () {
    server.stop();
  });

  it('should respond HelloWorld', function (done) {
    server.start(PORT_NUM);

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

  it('should serve a file', function () {
    var testDir = 'generated/test',
        testFile = testDir + '/test.html';
    try {
      fs.writeFileSync(testFile, 'hello world');
    }
    finally {
      fs.unlinkSync(testFile);
      expect(fs.accessSync.bind(fs, testFile))
        .to.throw(/no such file or directory/);
    }
  });

  it('should throws an exception without port number', function () {
    expect(server.start).to.throws(/port number is required/);
    server.start(PORT_NUM);
  });
});