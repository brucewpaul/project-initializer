var package = require('../../../ingredients/package/package.js');
var angular = require('../../../ingredients/package/ang-dependencies.js');
var react = require('../../../ingredients/package/react-dependencies.js');
var sqlite = require('../../../ingredients/package/sqlite-dependencies.js');
var mongo = require('../../../ingredients/package/mongo-dependencies.js');

module.exports = function(options) {
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

  package.scripts = frontEndFramework.scripts;
  package.dependencies = frontEndFramework.dependencies;
  package.devDependencies = frontEndFramework.devDependencies;

  package.dependencies = Object.assign(package.dependencies, backEndDatabase.dependencies);

  return package;
}