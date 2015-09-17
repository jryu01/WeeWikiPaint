var gulp = require('gulp');

gulp.task('dependency', function () {
  console.log('dependency');
});

gulp.task('example', ['dependency'], function () {
  console.log("example");
});

gulp.task('default', [], function () {
  console.log('default');
});