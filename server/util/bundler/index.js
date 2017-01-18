var crypto = require("crypto");
var exec = require('child_process').exec;
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

var path = require('path');

var assembleFiles = require('./assemble-files.js');

var animalNames = require('./animal-names.js');

/**
 * @param {object} options - selected options from client
 * @param {function} cb - callback function to send response back to client
**/
module.exports = function(req, cb) {
  // TODO: Change this to be unique id of user @chan @bruce
  var id;
  var uniquePath

  if ( req.body.user.userName ) {
    if ( req.body.user.projectName ) {
      id = req.body.user.userName + '/' + req.body.user.projectName;
    } else {
      id = req.body.user.userName + '/' + 'stack-' + animalNames.names[Math.floor(Math.random()*animalNames.names.length)] + '-' + crypto.randomBytes(4).toString('hex');
    }
    uniquePath = path.join(__dirname, '../../bundles', id);
  } else {
    id = 'guest/stack-' + animalNames.names[Math.floor(Math.random()*animalNames.names.length)] + '-' + crypto.randomBytes(4).toString('hex');
    uniquePath = path.join(__dirname, '../../bundles', id);
  }

  console.log(uniquePath);
  // check if folder for output already exists
  // TODO: create random generator, if it exists, call this function again @bruce
  fs.existsAsync(uniquePath)
    .then((exists) => {
      if ( !exists ) {
        // create folder for output
        fs.mkdirAsync(uniquePath)
          .then((err) => {
            if ( err ) {
              return cb(new Error(err));
            } else {
              // assemble the files
              if ( req.body.devTools.taskRunner.plugins.length === 0) {
                req.body.devTools.taskRunner.plugins = ['cssmin', 'uglify'],
                req.body.devTools.taskRunner.tasks = [
                  {
                    name: 'build',
                    plugins: ['cssmin', 'uglify']
                  }
                ]
              }
              assembleFiles(req.body, uniquePath, id, cb)
            }
          })
          .catch((err) => {
            return cb(new Error(err));
          });
      }
    })
    .catch((err) => {
      // return cb(new Error(err));
    });
}