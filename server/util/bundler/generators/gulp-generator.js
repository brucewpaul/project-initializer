var fs = require('fs');
var _ = require('lodash');

var gulpModules = [
  '\'use strict\';\n',
  'var gulp = require(\'gulp\');\n',
  'var extname = require(\'gulp-extname\');\n'
];

var gulpOptions = {
  sass: 'var sass = require(\'gulp-sass\');\n',
  less: 'var less = require(\'gulp-less\');\n',
  cssmin: 'var cleanCSS = require(\'gulp-clean-css\');\n',
  uglify: 'var gulp-uglify = require(\'gulp-uglify\');\n',
  watch: ''
};

var gulpTasks = {
  sass: '\ngulp.task(\'build-sass\', function () {\n  return gulp.src(\'client/public/assets/*.scss\')\n    .pipe(sass())\n    .pipe(extname(\'.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});\n',
  less: '\ngulp.task(\'build-less\', function () {\n  return gulp.src(\'client/public/assets/*.less\')\n    .pipe(less())\n    .pipe(extname(\'.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});\n',
  cssmin: '\ngulp.task(\'build-css\', function () {\n  return gulp.src(\'client/public/assets/*.css\')\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});\n',
  uglify: '\ngulp.task(\'uglify\', function () {\n  return gulp.src([\'client/assets/*.js\', \'client/assets/!*.min.js\'])\n    .pipe(gulp-uglify())\n    .pipe(extname(\'.min.js\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});\n',
  watch: ''
};

function createCombinedTasks (taskObj) {
  if (taskObj.plugins.includes('watch')) {
    taskObj.plugins.splice(taskObj.plugins.indexOf('watch'), 1);
    return '\ngulp.watch(\'client/public/assets\', ' + JSON.stringify(taskObj.plugins) + ');\n';
  } else {
    return '\ngulp.task(\'' + taskObj.name + '\', ' + JSON.stringify(taskObj.plugins) + ');\n';
  }
};

function createGulpFile (options) {
  var gulpFile = '';
  var rawTasks = [];
  var gulpModulesTemp = gulpModules.slice();

  _.forEach(options.devTools.taskRunner.plugins, function(plugin) {
    gulpModulesTemp.push(gulpOptions[plugin]);
    rawTasks.push(gulpTasks[plugin]);
  });

  _.forEach(gulpModulesTemp, function(dependency) {
    gulpFile += dependency;
  }); //writes the require statements

  _.forEach(rawTasks, function(task) {
    gulpFile += task;
  }); //writes the individual tasks

  var combinedTasks = [];

  for (var i = 0; i < options.devTools.taskRunner.tasks.length; i++) {
    combinedTasks.push(createCombinedTasks(options.devTools.taskRunner.tasks[i]));
  }//builds and puts the tasks in combined tasks

  _.forEach(combinedTasks, function(task) {
    gulpFile += task;
  });
  return gulpFile;
};

module.exports = createGulpFile;