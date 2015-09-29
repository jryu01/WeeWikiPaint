'use strict';

var expect = require('chai').expect,
    server = require('./server'),
    http = require('http'),
    fs = require('fs');

describe('Http server', function () {

  var PORT_NUM = 3000,
      TEST_FILE = 'generated/test/test.html';

  afterEach(function (done) {
    server.stop(function () {
      try {
        fs.unlinkSync(TEST_FILE);
      } catch (e) {}
      finally {
        expect(fs.accessSync.bind(fs, TEST_FILE))
          .to.throw(/no such file or directory/);
        done();
      }
    });
  });

  it('should serve a file', function (done) {

      var testData = 'This is served from a file';

      fs.writeFileSync(TEST_FILE, testData);
      server.start(TEST_FILE, PORT_NUM);

      var request = http.get('http://localhost:' + PORT_NUM );

      request.on('response', function (res) {

        var data = '';

        expect(res.statusCode).to.equals(200);

        res.on('data', function (chunk) {
          data += chunk;
        });
        res.on('end', function () {
          expect(testData).to.equals(data);
          done();
        });
      });
  });

  it('requires file to serve', function () {
    expect(server.start.bind(server)).throw(/A file to serve is required/);
  });

  it('should throws an exception without port number', function () {
    expect(server.start.bind(server, TEST_FILE))
      .to.throws(/port number is required/);
  });

  it('should excute callback when server stops', function (done) {
    server.start(TEST_FILE, PORT_NUM);
    server.stop(done);
  });
});