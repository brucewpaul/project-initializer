var package = require('../../../ingredients/package/package.js');
var angular = require('../../../ingredients/package/ang-dependencies.js');
var sqlite = require('../../../ingredients/package/sqlite-dependencies.js');

module.exports = function(options) {
  if ( options.frontEnd.framework === 'Angular' ) {
    package.scripts = angular.scripts;
    package.dependencies = angular.dependencies;
    package.devDependencies = angular.devDependencies;
  }

  if ( options.frontEnd.framework === 'React' ) {
  }

  if ( options.backEnd.database === 'Sqlite3' ) {
    package.dependencies = Object.assign(package.dependencies, sqlite.dependencies);
  }

  if ( options.backEnd.database === 'Mongo' ) {
  }

  return package;
}