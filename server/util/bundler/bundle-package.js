var path = require('path');

var angular = require(path.join(__dirname, '../../../ingredients/package/ang-dependencies.js'));
var mocha = require(path.join(__dirname, '../../../ingredients/package/mocha-dependencies.js'));
var mongo = require(path.join(__dirname, '../../../ingredients/package/mongo-dependencies.js'));
var package = require(path.join(__dirname, '../../../ingredients/package/package.js'));
var react = require(path.join(__dirname, '../../../ingredients/package/react-dependencies.js'));
var sqlite = require(path.join(__dirname, '../../../ingredients/package/sqlite-dependencies.js'));

module.exports = function(options) {
  var frontEndFramework, backEndDatabase;

  if ( options.frontEnd.framework === 'Angular' ) {
    frontEndFramework = angular;
  } else if ( options.frontEnd.framework === 'React' ) {
    frontEndFramework = react;
  }

  if ( options.backEnd.database === 'Sqlite' ) {
    backEndDatabase = sqlite;
  } else if ( options.backEnd.database === 'Mongo' ) {
    backEndDatabase = mongo;
  }

  // combine the different dependencies and scripts from front end and backend modules
  package.scripts = Object.assign(frontEndFramework.scripts, backEndDatabase.scripts, mocha.scripts);
  package.dependencies = Object.assign(frontEndFramework.dependencies, backEndDatabase.dependencies, mocha.dependencies);
  package.devDependencies = Object.assign(frontEndFramework.devDependencies, backEndDatabase.devDependencies, mocha.devDependencies);

  return package;
}