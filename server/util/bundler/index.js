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

// TODO: Change this to be unique id of user
var id = new Date().valueOf().toString();

uniquePath = path.join('../../bundles', id);

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
            // assemble the files
            assembleFiles(options, uniquePath, id)
            // TODO: will eventually receive theurl/id of folder to send back to client
          }
        });
    }
});

module.exports = function() {

}