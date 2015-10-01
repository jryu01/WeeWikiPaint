'use strict';
/*jshint expr: true*/

var expect = require('chai').expect,
    http = require('http'),
    child = require('child_process'), 
    node;

var runServer = function (callback) {
  node = child.spawn('node', ['src/server/weewikipaint', '8080']);
  node.stdout.setEncoding('utf8');
  node.stdout.on('data', function (chunk) {
    if (chunk.trim() === 'Server started') {
      callback(null);
    } else {
      callback(chunk);
    }
  });
  node.stderr.setEncoding('utf8');
  node.stderr.on('data', callback);
};

var httpGet = function (url, callback) {
  var request = http.get(url);
  request.on('response', function (res) {
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      callback(res, body);
    });
  });
};

describe('Smoke test', function () {

  before(runServer);

  after(function (done) {
    node.kill();
    node.on('exit', done);
  });

  it('should get the hompage', function (done) {
    httpGet('http://localhost:8080', function (res, data) {
      var foundHomePage = data.indexOf('weewikipaint home page') !== -1;
      expect(foundHomePage).to.be.ok;
      done();
    });
  });

  it('should get the 404 page', function (done) {
    httpGet('http://localhost:8080/nonexistant.html', function (res, data) {
      var foundPage = data.indexOf('weewikipaint 404 page') !== -1;
      expect(foundPage).to.be.ok;
      done();
    });
  });

});