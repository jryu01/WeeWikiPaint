'use strict';

var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('lint', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function () {
  return gulp.src(['src/**/*.spec.js'])
    .pipe(mocha({ reporter: 'spec'}));
});

gulp.task('default', ['lint', 'test']);


gulp.task('watch', function () {
  return gulp.watch(['src/**/*.js', './gulpfile.js'], ['lint', 'test']);
});

gulp.task('integrate', ['default'], function () {
  console.log('Integration');
});