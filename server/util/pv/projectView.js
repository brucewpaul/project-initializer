var path = require('path');
var fs = require('fs');
var dirTree = require('directory-tree');
var _ = require('lodash');

module.exports.getProjectJSON = function(bundleId) {
  var bundlePath = path.join(__dirname, '..', '..', 'bundles', bundleId);
  var bundle = dirTree(bundlePath);
  // filter .DS_Store objects out of tree
  var traverseTree = function(node) {
    if (node.extension) {
      // read the path and add the path to the object
      node.contents = fs.readFileSync(node.path, 'utf8');
      node.fileId = Math.random().toString(36).slice(2);
    }
    if (node.children && node.children.length > 0) {
      for (var i = 0; i < node.children.length; i++) {
        traverseTree(node.children[i]);
      }
    }
  }
  traverseTree(bundle);
  return bundle;
}