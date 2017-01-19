'use strict';
var gulp = require('gulp');
var extname = require('gulp-extname');
var cleanCSS = require('gulp-clean-css');
var gulp-uglify = require('gulp-uglify');

gulp.task('build-css', function () {
  return gulp.src('client/public/assets/*.css')
    .pipe(cleanCSS())
    .pipe(extname('.min.css'))
    .pipe(gulp.dest('client/public/assets'));
});

gulp.task('uglify', function () {
  return gulp.src(['client/assets/*.js', 'client/assets/!*.min.js'])
    .pipe(gulp-uglify())
    .pipe(extname('.min.js'))
    .pipe(gulp.dest('client/public/assets'));
});

gulp.task('build', ["cssmin","uglify"]);
