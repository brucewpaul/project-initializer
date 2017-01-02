var angular = require('../../../ingredients/package/ang-dependencies.js');
var mocha = require('../../../ingredients/package/mocha-dependencies.js');
var mongo = require('../../../ingredients/package/mongo-dependencies.js');
var package = require('../../../ingredients/package/package.js');
var react = require('../../../ingredients/package/react-dependencies.js');
var sqlite = require('../../../ingredients/package/sqlite-dependencies.js');

module.exports = function(options) {
  var frontEndFramework, backEndDatabase;

  if ( options.frontEnd.framework === 'Angular' ) {
    frontEndFramework = angular;
  } else if ( options.frontEnd.framework === 'React' ) {
    frontEndFramework = react;
  }

  if ( options.backEnd.database === 'Sqlite3' ) {
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