var exec = require('child_process').exec;
var Promise = require('bluebird');
// var fs = require('fs');
var fs = Promise.promisifyAll(require("fs"));
var path = require('path');
// var ncp = require('ncp').ncp;
var ncp = Promise.promisifyAll(require('ncp'));

ncp.limit = 16;

var bundlePackage = require('./bundle-package.js');

module.exports = function(options, outputPath, id) {
  var frontEndFramework = options.frontEnd.framework;
  var backEndDatabase = options.backEnd.database;
  var ingredientsPath = '../../../ingredients';

  var asyncTasks = [];

  // create package.json
  packageJSON = bundlePackage(options);

  asyncTasks.push(fs.writeFileAsync(path.join(outputPath, 'package.json'), JSON.stringify(packageJSON, null, 2))
    .then((err) => {
      if (err) throw err;
      console.log('package.json done!');
    }));

  // add server functionality
  asyncTasks.push(ncp.ncpAsync('../../../ingredients/basic-server', path.join(outputPath, 'server'))
    .then(function() {
      console.log('server done!');
    }).catch(function (err) {
     return console.error('server', err);
   })
  );

  // add db
  // if ( options.backEnd.database === 'Sqlite3' ) {
    asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, backEndDatabase), path.join(outputPath, 'db'))
      .then(function() {
        console.log('db done!');
      }).catch(function (err) {
       return console.error('db', err);
     })
    );
  // }

  // if ( options.backEnd.database === 'Mongo' ) {
  //   asyncTasks.push(ncp.ncpAsync('../../../ingredients/db-mongo', path.join(outputPath, 'db'))
  //     .then(function() {
  //       console.log('mongo done!');
  //     }).catch(function (err) {
  //      return console.error('Mongo', err);
  //    })
  //   );
  // }

  // add front end
  // if ( options.frontEnd.framework === 'Angular' ) {
    asyncTasks.push(ncp.ncpAsync(path.join(ingredientsPath, frontEndFramework), path.join(outputPath, 'client'))
      .then(function() {
        console.log('Front End Framework done!');
      }).catch(function (err) {
       return console.error('frontend', err);
     })
    );
  // }

  // if ( options.frontEnd.framework === 'React' ) {
  //   asyncTasks.push(ncp.ncpAsync('../../../ingredients/react-app', path.join(outputPath, 'client'))
  //     .then(function() {
  //       console.log('React done!');
  //     }).catch(function (err) {
  //      return console.error('React', err);
  //    })
  //   );
  // }
  // add tasks
  // add testing
  Promise.all(asyncTasks)
    .then( function() {
      console.log("all the files were created");
      exec(`cd ../../bundles && tar -zcvf ${id}.tar.gz ${id}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        return;
      });
    })
    .catch(function(err) {
      console.log('error:', err)
    })


}