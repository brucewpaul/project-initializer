module.exports = fucntion(options) {

  var package = require('../../ingredients/package/package.js');
  var angular = require('../../ingredients/package/ang-dependencies.js');

  package.scripts = angular.scripts;
  package.dependencies = angular.dependencies;
  package.devDependencies = angular.devDependencies;

  return package;
}