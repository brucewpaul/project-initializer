var fs = require('fs');
var _ = require('lodash');



var gulpModules = [
'var gulp = require(\'gulp\');\n',
'var cleanCSS = require(\'gulp-clean-css\');\n',
'var extname = require(\'gulp-extname\');\n'
];

var gulpOptions = {
  sass: 'var sass = require(\'gulp-sass\');\n',
  less: 'var less = require(\'gulp-less\');\n',
  null: '\n'
};

var gulpTasks = {
  sass: 'gulp.task(\'sass\', function () {\n  return gulp.src(\'client/public/assets/*.scss\')\n    .pipe(sass().on(\'error\', sass.logError))\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});\n',
  less: 'gulp.task(\'less\', function () {\n  return gulp.src(\'client/public/assets/*.less\')\n    .pipe(less())\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});\n',
  css: 'gulp.task(\'cssminify\', function () {\n  return gulp.src(\'client/public/assets/*.css\')\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});'
}

var gulpWatch = 'gulp.watch(\'client/public/assets\', [' + options.devTools.
plugins[0] + ']);\n';

function createGulpFile (options) {
  var gulpFile = '';
  gulpModules.push(gulpOptions[options.devTools.
  plugins[0]]); //set up the dependancies with less/sass
  _.forEach(gulpModules, function(dependency) {
    gulpFile += dependency;
  });
  gulpFile += gulpTasks[options.devTools.
  plugins[0]];
  gulpFile += gulpWatch;
  return gulpFile;
};

module.exports = createGulpFile;