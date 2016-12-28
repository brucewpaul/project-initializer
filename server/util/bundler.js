var package = require('../../ingredients/package/package.js');
var angular = require('../../ingredients/package/ang-dependencies.js');

var options = {
  frontEnd:{
    framework: 'Angular'
  },
  backEnd: {
    database: 'Sqlite3'
  }
}

module.exports = function() {
  if ( options.frontEnd.framework === 'Angular' ) {
    package.scripts = angular.scripts;
    package.dependencies = angular.dependencies;
    package.devDependencies = angular.devDependencies;
  }

  if ( options.backEnd.database === 'Sqlite3' ) {

  }

  return package;
}