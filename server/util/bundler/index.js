var crypto = require("crypto");
var exec = require('child_process').exec;
var Promise = require('bluebird');
// var fs = require('fs');
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
  if ( req.user ) {
    id = req.user.username + req.body.user.projectName;
  } else {
    id = 'stack-' + animalNames.names[Math.floor(Math.random()*animalNames.names.length)] + '-' + crypto.randomBytes(4).toString('hex');
  }
  var uniquePath = path.join(__dirname, '../../bundles', id);
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
              assembleFiles(req.body, uniquePath, id, cb)
            }
          })
          .catch((err) => {
            return cb(new Error(err));
          });
      }
    })
    .catch((err) => {
      return cb(new Error(err));
    });
}