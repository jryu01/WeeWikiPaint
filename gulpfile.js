'use strict';

var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var NODE_VERSION = '0.10.33'; // must be in the form of [major].[minor].[patch]

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

gulp.task('lint', ['nodev'], function () {
  return gulp.src(['src/**/*.js', 'spike/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', ['nodev'], function () {
  return gulp.src(['src/**/*.spec.js'])
    .pipe(mocha({ reporter: 'spec'}));
});

gulp.task('default', ['lint', 'test']);

gulp.task('watch', ['default'], function () {
  return gulp.watch(['src/**/*.js', './gulpfile.js'], ['lint', 'test']);
});

gulp.task('integrate', ['default'], function () {
  console.log('Integration step goes here');
});