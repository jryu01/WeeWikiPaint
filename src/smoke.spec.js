'use strict';
/*jshint expr: true*/

var expect = require('chai').expect,
    http = require('http'),
    fs = require('fs'),
    childProcess = require('child_process'), 
    child;

var PORT_NUM = 5000, 
    HOST = 'http://localhost:' + PORT_NUM;


var parseProcfile = function () {
  var procfile = fs.readFileSync('Procfile', { encoding: 'utf8' }),
      parsedCommand = procfile.trim()
        .replace('$PORT', 5000).split(' ').slice(1);
  return {
    command: parsedCommand.shift(),
    args: parsedCommand
  };
};

var runServer = function (callback) {
  var commandLine = parseProcfile();
  child = childProcess.spawn(commandLine.command, commandLine.args);
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (chunk) {
    if (chunk.trim() === 'Server started') {
      callback(null);
    } else {
      callback(chunk);
    }
  });
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', callback);
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
    child.kill();
    child.on('exit', done);
  });

  it('should get the hompage', function (done) {
    httpGet(HOST, function (res, data) {
      var foundHomePage = data.indexOf('weewikipaint home page') !== -1;
      expect(foundHomePage).to.be.ok;
      done();
    });
  });

  it('should get the 404 page', function (done) {
    httpGet(HOST + '/nonexistant.html', function (res, data) {
      var foundPage = data.indexOf('weewikipaint 404 page') !== -1;
      expect(foundPage).to.be.ok;
      done();
    });
  });

});