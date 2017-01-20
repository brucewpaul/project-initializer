var exec = require('child_process').exec;
var path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var ncp = Promise.promisifyAll(require('ncp'));

ncp.limit = 16;

var bundlePackage = require('./generators/package-generator.js');
var bundleGruntfile = require('./generators/grunt-generator.js');
var bundleGulpfile = require('./generators/gulp-generator.js');
var bundleReadme = require('./generators/readme-generator.js');
var bundleGulpTestfile = require('./generators/gulpTest-generator.js');
// files for Angular
var bowerFile = require('../../../ingredients/bower/bower.js');
var bowerrcFile = require('../../../ingredients/bower/bowerrc.js');

/**
 * @param {object} options - selected options from client
 * @param {string} outputPath - root directory for client folder
 * @param {string} id - unique folder id
 * @param {function} cb - callback function to send response back to client
**/
module.exports = function(options, outputPath, id, cb) {
  var frontEndFramework = options.frontEnd.framework;
  var backEndDatabase = options.backEnd.database;
  var ingredientsPath = path.join(__dirname, '../../../ingredients');

  var asyncTasks = [];

  fs.mkdir(path.join(outputPath, 'test'));

  // create package.json
  var packageJSON = bundlePackage(options);

  // create package.json file and write stringified packageJSON to file
  asyncTasks.push(fs.writeFileAsync(path.join(outputPath, 'package.json'), JSON.stringify(packageJSON, null, 2)));

  // create readme file and add content
  asyncTasks.push(fs.writeFileAsync(path.join(outputPath, 'README.md'), bundleReadme(options)));

  // create Gruntfile.js
  if (options.devTools.taskRunner.name === 'Grunt') {
    asyncTasks.push(fs.writeFileAsync(path.join(outputPath, 'Gruntfile.js'), bundleGruntfile(options)));
  } else if (options.devTools.taskRunner.name === 'Gulp') {
    asyncTasks.push(fs.mkdirAsync(path.join(outputPath, 'test', 'Gulp')).then(function () {
      fs.writeFileAsync(path.join(outputPath, 'Gulpfile.js'), bundleGulpfile(options));
      fs.writeFileAsync(path.join(outputPath, 'test', 'Gulp', 'gulpTest.js'), bundleGulpTestfile(options));
    }));
  }

  // add bower if is angular
  if (frontEndFramework === 'Angular') {
    asyncTasks.push(fs.writeFileAsync(path.join(outputPath, 'bower.json'), JSON.stringify(bowerFile, null, 2)));

    asyncTasks.push(fs.writeFileAsync(path.join(outputPath, '.bowerrc'), JSON.stringify(bowerrcFile, null, 2)));

    // add testing for angular specifically
    asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, 'Test', frontEndFramework), path.join(outputPath, 'test', frontEndFramework)));
  }

  if (frontEndFramework === 'React') {
    // add testing for react specifically
    if (options.devTools.testing === 'Mocha') {
      asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, 'Test', frontEndFramework), path.join(outputPath, 'test', frontEndFramework)));
    }
  }

  // add server
  asyncTasks.push( fs.mkdirAsync(path.join(outputPath, 'server')).then(function() {
    asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, 'basic-server'), path.join(outputPath, 'server')));
    asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, backEndDatabase), path.join(outputPath, 'server')));
  }))

  // add front end
  asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, frontEndFramework), path.join(outputPath)));

  // add testing for server
  asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, 'Test/Server'), path.join(outputPath, 'test/Server')));

  // add testing for db
  asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, 'Test', backEndDatabase), path.join(outputPath, 'test', backEndDatabase)));

  Promise.all(asyncTasks)
    .then( function() {
      console.log('test', outputPath, id)
      var folderName = id.split('/');
      console.log('test2',folderName)
      exec(`cd ${outputPath}/../ && tar -zcvf ${folderName[1]}.tar.gz ${folderName[1]}`, (error, stdout, stderr) => {
        if (error) {
          return cb(new Error(error));
        }
        // TODO: return url/id of file to send back
        return cb(null, `${id}`);
      });
    })
    .catch(function(err) {
      return cb(new Error(err));
    })
}