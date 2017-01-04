var path = require('path');
var _ = require('lodash');
var angular = require(path.join(__dirname, '../../../ingredients/package/ang-dependencies.js'));
var mocha = require(path.join(__dirname, '../../../ingredients/package/mocha-dependencies.js'));
var mongo = require(path.join(__dirname, '../../../ingredients/package/mongo-dependencies.js'));
var package = require(path.join(__dirname, '../../../ingredients/package/package.js'));
var react = require(path.join(__dirname, '../../../ingredients/package/react-dependencies.js'));
var sqlite = require(path.join(__dirname, '../../../ingredients/package/sqlite-dependencies.js'));
var grunt = require(path.join(__dirname, '../../../ingredients/package/grunt-dependencies.js'));

module.exports = function(options) {
  var frontEndFramework, backEndDatabase, taskRunnerDependencies;

  if ( options && options.frontEnd.framework === 'Angular' ) {
    frontEndFramework = angular;
  } else if ( options && options.frontEnd.framework === 'React' ) {
    frontEndFramework = react;
  } else {
    frontEndFramework = {
      scripts: {},
      dependencies: {},
      devDependencies: {}
    }
  }

  if ( options && options.backEnd.database === 'Sqlite' ) {
    backEndDatabase = sqlite;
  } else if ( options && options.backEnd.database === 'Mongo' ) {
    backEndDatabase = mongo;
  } else {
    backEndDatabase = {
      scripts: {},
      dependencies: {},
      devDependencies: {}
    }
  }

  if ( options && options.devTools.taskRunner.name === 'grunt' ) {
    taskRunnerDependencies = Object.assign({}, grunt.mainDependencies);
    _.forEach(options.devTools.taskRunner.plugins, function(plugin) {
      taskRunnerDependencies = Object.assign(taskRunnerDependencies, grunt[plugin]);
    });
    package.devDependencies = Object.assign(taskRunnerDependencies);
  }

  if ( options && options.devTools.testing === 'Mocha' ) {
    tesing = mocha;
  } else {
    tesing = {
      scripts: {},
      dependencies: {},
      devDependencies: {}
    }
  }

  // combine the different dependencies and scripts from front end and backend modules
  package.scripts = Object.assign(frontEndFramework.scripts, backEndDatabase.scripts, tesing.scripts);
  package.dependencies = Object.assign(frontEndFramework.dependencies, backEndDatabase.dependencies, tesing.dependencies);
  package.devDependencies = Object.assign(package.devDependencies, frontEndFramework.devDependencies, backEndDatabase.devDependencies, tesing.devDependencies);

  return package;
}