var exec = require('child_process').exec;
var Promise = require('bluebird');
// var fs = require('fs');
var fs = Promise.promisifyAll(require("fs"));
var path = require('path');
var ncp = require('ncp').ncp;

ncp.limit = 16;

var bundlePackage = require('./bundle-package.js');

module.exports = function(options, outputPath) {
  var asyncTasks = []
  // add server functionality
  asyncTasks.push(ncp('../../../ingredients/basic-server', path.join(outputPath, 'server'), function (err) {
    if (err) {
     return console.error('sqlite3', err);
    }
    console.log('done!');
  }));

  // create package.json
  packageJSON = bundlePackage(options);

  asyncTasks.push(fs.writeFileAsync(path.join(outputPath, 'package.json'), JSON.stringify(packageJSON, null, 2))
    .then((err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    }));

  // add db
  if ( options.backEnd.database === 'Sqlite3' ) {
    asyncTasks.push(ncp('../../../ingredients/db-sqlite', path.join(outputPath, 'db'), function (err) {
      if (err) {
       return console.error('Sqlite3', err);
      }
      console.log('done!');
    }));
  }

  if ( options.backEnd.database === 'Mongo' ) {
    asyncTasks.push(ncp('../../../ingredients/db-mongo', path.join(outputPath, 'db'), function (err) {
      if (err) {
       return console.error('Mongo', err);
      }
      console.log('done!');
    }));
  }

  // add front end
  if ( options.frontEnd.framework === 'Angular' ) {
    asyncTasks.push(ncp('../../../ingredients/ang-app', path.join(outputPath, 'client'), function (err) {
      if (err) {
       return console.error('Angular', err);
      }
      console.log('done!');
    }));
  }

  if ( options.frontEnd.framework === 'React' ) {
    asyncTasks.push(ncp('../../../ingredients/react-app', path.join(outputPath, 'client'), function (err) {
      if (err) {
       return console.error('React', err);
      }
      console.log('done!');
    }));
  }
  // add tasks
  // add testing
  Promise.all(asyncTasks).then(function() {
    console.log("all the files were created");
  });

}