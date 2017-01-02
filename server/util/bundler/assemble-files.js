var exec = require('child_process').exec;
var path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var ncp = Promise.promisifyAll(require('ncp'));

ncp.limit = 16;

var bundlePackage = require('./bundle-package.js');
var bundleGruntfile = require('./grunt-helpers.js');

module.exports = function(options, outputPath, id, cb) {
  var frontEndFramework = options.frontEnd.framework;
  var backEndDatabase = options.backEnd.database;
  var ingredientsPath = path.join(__dirname, '../../../ingredients');

  var asyncTasks = [];

  // create package.json
  packageJSON = bundlePackage(options);

  asyncTasks.push(fs.writeFileAsync(path.join(outputPath, 'package.json'), JSON.stringify(packageJSON, null, 2))
    .then((err) => {
      if (err) throw err;
      console.log('package.json done!');
    }));

  // create Gruntfile.js
  asyncTasks.push(fs.writeFileAsync(path.join(outputPath, 'Gruntfile.js'), bundleGruntfile(options))
    .then((err) => {
      if (err) throw err;
      console.log('Gruntfile.js done!');
    }));

  // add server functionality
  asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, 'basic-server'), path.join(outputPath, 'server'))
    .then(function() {
      console.log('server done!');
    }).catch(function (err) {
     return console.error('server', err);
   })
  );

  // add db
  asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, backEndDatabase), path.join(outputPath, 'db'))
    .then(function() {
      console.log('db done!');
    }).catch(function (err) {
     return console.error('db', err);
   })
  );

  // add front end
  asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, frontEndFramework), path.join(outputPath, 'client'))
    .then(function() {
      console.log('Front End Framework done!');
    }).catch(function (err) {
     return console.error('frontend', err);
   })
  );

  // add tasks

  // add testing
  asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, 'Test'), path.join(outputPath, 'test'))
    .then(function() {
      console.log('test done!');
    }).catch(function (err) {
     return console.error('test', err);
   })
  );

  Promise.all(asyncTasks)
    .then( function() {
      console.log("all the files were created");
      exec(`cd ${outputPath}/../ && tar -zcvf ${id}.tar.gz ${id}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        // TODO: return url/id of file to send back
        cb(`${id}.tar.gz`);
      });
    })
    .catch(function(err) {
      console.log('error:', err)
    })
}