var exec = require('child_process').exec;
var path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var ncp = Promise.promisifyAll(require('ncp'));

ncp.limit = 16;

var bundlePackage = require('./bundle-package.js');
var bundleGruntfile = require('./grunt-helpers.js');

var bowerFile = require('../../../ingredients/bower/bower.js');
var bowerrcFile = require('../../../ingredients/bower/bowerrc.js');

module.exports = function(options, outputPath, id, cb) {
  var frontEndFramework = options.frontEnd.framework;
  var backEndDatabase = options.backEnd.database;
  var ingredientsPath = path.join(__dirname, '../../../ingredients');

  var asyncTasks = [];

  fs.mkdir(path.join(outputPath, 'Test'));

  // create package.json
  packageJSON = bundlePackage(options);

  asyncTasks.push(fs.writeFileAsync(path.join(outputPath, 'package.json'), JSON.stringify(packageJSON, null, 2))
    .then((err) => {
      if (err) {
        // return cb(new Error(err));
      }
      // console.log('package.json done!');
    }));

  // create Gruntfile.js
  if (options.devTools.taskRunner.name === 'grunt') {
    asyncTasks.push(fs.writeFileAsync(path.join(outputPath, 'Gruntfile.js'), bundleGruntfile(options))
      .then((err) => {
        if (err) {
          // return cb(new Error(err));
        }
        // console.log('Gruntfile.js done!');
      }));
  }

  // add bower if is angular
  if (frontEndFramework === 'Angular') {
    asyncTasks.push(fs.writeFileAsync(path.join(outputPath, 'bower.json'), JSON.stringify(bowerFile, null, 2))
      .then((err) => {
        if (err) {
          // return cb(new Error(err));
        }
        // console.log('Gruntfile.js done!');
      }));
    asyncTasks.push(fs.writeFileAsync(path.join(outputPath, '.bowerrc'), JSON.stringify(bowerrcFile, null, 2))
      .then((err) => {
        if (err) {
          // return cb(new Error(err));
        }
        // console.log('Gruntfile.js done!');
      }));
  }

  // add server functionality
  asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, 'basic-server'), path.join(outputPath, 'server'))
    .then(function() {
      // console.log('server done!');
      // add db functionality
      asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, backEndDatabase), path.join(outputPath, 'server'))
        .then(function() {
          // console.log('db done!');
        }).catch(function (err) {
          // return cb(new Error(err));
       })
      );
    }).catch(function (err) {
      // return cb(new Error(err));
   })
  );

  // add front end
  asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, frontEndFramework), path.join(outputPath))
    .then(function() {
      // console.log('Front End Framework done!');
    }).catch(function (err) {
      // return cb(new Error(err));
   })
  );

  // add tasks

  // add testing for server
  asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, 'Test/Server'), path.join(outputPath, 'test/Server'))
    .then(function() {
      // console.log('test done!');
    }).catch(function (err) {
      // return cb(new Error(err));
   })
  );

  // add testing for db
  asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, 'Test', backEndDatabase), path.join(outputPath, 'test', backEndDatabase))
    .then(function() {
      // console.log('test done!');
    }).catch(function (err) {
      // return cb(new Error(err));
   })
  );

  Promise.all(asyncTasks)
    .then( function() {
      // console.log("all the files were created");
      exec(`cd ${outputPath}/../ && tar -zcvf ${id}.tar.gz ${id}`, (error, stdout, stderr) => {
        if (error) {
          return cb(new Error(error));
        }
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
        // TODO: return url/id of file to send back
        return cb(null, `${id}`);
      });
    })
    .catch(function(err) {
      return cb(new Error(err));
    })
}