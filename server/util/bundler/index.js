var exec = require('child_process').exec;
var Promise = require('bluebird');
// var fs = require('fs');
var fs = Promise.promisifyAll(require("fs"));

var path = require('path');

var assembleFiles = require('./assemble-files.js');

var options = {
  frontEnd:{
    framework: 'Angular'
  },
  backEnd: {
    database: 'Sqlite3'
  }
}

uniquePath = path.join('../../bundles', new Date().toString());

// check if folder for output already exists
fs.existsAsync(uniquePath)
  .then((exists) => {
    if ( !exists ) {
      // create folder for output
      fs.mkdirAsync(uniquePath)
        .then((err) => {
          if ( err ) {
            console.log(err);
          } else {
            assembleFiles(options, uniquePath);
          }
        });
    }
});

module.exports = function() {

}