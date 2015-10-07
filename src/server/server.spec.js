'use strict';

var expect = require('chai').expect,
    server = require('./server'),
    http = require('http'),
    fs = require('fs');

var PORT_NUM = 8083,
    TEST_HOME_PAGE = 'generated/test/testHome.html',
    TEST_404_PAGE = 'generated/test/test404.html';

var httpGet = function (url, callback) {

  server.start(TEST_HOME_PAGE, TEST_404_PAGE, PORT_NUM, function () {
    var request = http.get(url);

    request.on('response', function (res) {

      var body = '';

      res.on('data', function (chunk) {
        body += chunk;
      });
      res.on('end', function () {
        server.stop(callback.bind(null, res, body));
      });
    });
  });
};

var cleanUpFile = function (file) {
  try {
    fs.unlinkSync(file);
  } catch (e) {}
  finally {
    expect(fs.accessSync.bind(fs, file))
      .to.throw(/no such file or directory/);
  }
};

describe('Http server', function () {

  afterEach(function () {
    cleanUpFile(TEST_HOME_PAGE);
    cleanUpFile(TEST_404_PAGE);
  });

  it('should serve a home page from a file', function (done) {
    var expectedData = 'This is served from a file';

    fs.writeFileSync(TEST_HOME_PAGE, expectedData);
    httpGet('http://localhost:' + PORT_NUM, function (res, body) {
      expect(res.statusCode).to.equals(200);
      expect(expectedData).to.equals(body);
      done();
    });
  });

  it('should return home page when asked for index', function (done) {
    var url = 'http://localhost:' + PORT_NUM  + '/index.html';
    fs.writeFileSync(TEST_HOME_PAGE, 'foo');

    httpGet(url, function (res, body) {
      expect(res.statusCode).to.equals(200);
      done();
    });
  });

  it('should return 404 for everything except home page', function (done) {
    var expectedData = '404 File';

    fs.writeFileSync(TEST_404_PAGE, expectedData);
    httpGet('http://localhost:' + PORT_NUM + '/random', function (res, body) {
      expect(res.statusCode).to.equals(404);
      expect(expectedData).to.equals(body);
      done();
    });
  });

  it('should require home page parameter', function () {
    expect(server.start.bind(server))
      .throw(/A file to serve is required/);
  });

  it('should require 404 page parameter', function () {
    expect(server.start.bind(server, TEST_HOME_PAGE))
      .throw(/404 file to serve is required/);
  });

  it('should port number parameter', function () {
    expect(server.start.bind(server, TEST_HOME_PAGE, TEST_404_PAGE))
      .to.throws(/port number is required/);
  });

  it('should excute callback when server stops', function (done) {
    server.start(TEST_HOME_PAGE, TEST_404_PAGE, PORT_NUM, function () {
      server.stop(done);
    });
  });
});