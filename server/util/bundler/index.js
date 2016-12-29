var exec = require('child_process').exec;
var Promise = require('bluebird');
// var fs = require('fs');
var fs = Promise.promisifyAll(require("fs"));

var path = require('path');

var assembleFiles = require('./assemble-files.js');

var options = {
  frontEnd:{
    framework: 'React'
  },
  backEnd: {
    database: 'Mongo'
  }
}

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
            assembleFiles(options, uniquePath, id)
          }
        });
    }
});

module.exports = function() {

}