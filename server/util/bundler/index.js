var exec = require('child_process').exec;
var Promise = require('bluebird');
// var fs = require('fs');
var fs = Promise.promisifyAll(require("fs"));

var path = require('path');

var assembleFiles = require('./assemble-files.js');

var options = {
  frontEnd:{
    framework: 'React',
    styling: 'Javascipt/html/css'
  },
  backEnd: {
    database: 'Sqlite3'
  },
  devTools: {
    taskRunner: {
      name: 'grunt',
      plugins:['cssmin', 'uglify'],
      tasks:[
      {
        name: 'build',
        plugins: ['cssmin', 'uglify']
      }
      ]
    },
    bundler:{
      name: 'webpack',
      config:[]
    },
    testing: 'mocha/chai'
  }
}

// TODO: Change this to be unique id of user
var id = new Date().valueOf().toString();

var uniquePath = path.join('../../bundles', id);

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
            // TODO: will eventually receive the url/id of folder to send back to client
          }
        });
    }
});

module.exports = function() {

}