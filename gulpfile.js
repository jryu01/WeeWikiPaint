'use strict';

var gulp = require('gulp'),
    exec = require('child_process').exec,
    karma = require('karma'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var NODE_VERSION = '0.12.7'; // must be in the form of [major].[minor].[patch]
var GENERATED_DIR = 'generated';
var TEMP_TEST_DIR =  GENERATED_DIR + '/test';

// Ensures the node version.
gulp.task('nodev', function (done) {

  var parseNodeVersion = function (versionString) {
    return versionString.split('.').map(function (v) {
      return parseInt(v, 10);
    });
  };

  var actual = parseNodeVersion(process.versions.node);
  var expected = parseNodeVersion(NODE_VERSION);
  var failError = new Error(
    'Incorrect node version. Expected atleast ' +
    NODE_VERSION + ', but was ' + process.versions.node
  );
  failError.showStack = false;
  if (actual[0] < expected[0]) {
    return done(failError);
  }
  if (actual[0] === expected[0] && actual[1] < expected[1]) {
    return done(failError);
  }
  if (actual[0] === expected[0] && actual[1] === expected[1] && actual[2] < expected[2]) {
    return done(failError);
  }
  return done(); 
});

// Generates a test directory
gulp.task('testdir', function (done) {
  exec('mkdir -p ' + TEMP_TEST_DIR, function (error, stdout, stderr) {
    if (error) {
      error.showStack = false;
      return done(error);
    }
    return done();
  });
});

// Clean up generated files
gulp.task('clean', function (done) {
  exec('rm -rf ' + GENERATED_DIR, function (error, stdout, stderr) {
    if (error) {
      error.showStack = false;
      return done(error);
    }
    return done();
  });
});

// JSHint linting
gulp.task('lint', ['nodev'], function () {
  return gulp.src(['src/**/*.js', 'spike/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Run tests
gulp.task('testServer', ['nodev', 'testdir'], function () {
  return gulp.src(['src/server/**/*.spec.js', 'src/*.spec.js'])
    .pipe(mocha({ reporter: 'spec'}));
});

gulp.task('testClient', ['nodev', 'testdir'], function (done) {
  var test = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test', ['testServer', 'testClient']);

gulp.task('default', ['lint', 'test']);

gulp.task('integrate', ['default'], function () {
  console.log('Integration step goes here');
});

gulp.task('watch', function () {
  // watch for client files for test
  var karmaWacher = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
  }).start();
  // watch for client files for linting
  gulp.watch('src/client/**/*.spec.js', ['lint']);

  // watch for server files for linting and testing
  gulp.watch(
    ['src/server/**/*.spec.js', 'src/*.spec.js', './gulpfile.js'],
    ['lint', 'testServer']
  );
});