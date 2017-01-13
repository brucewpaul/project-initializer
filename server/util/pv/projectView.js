var path = require('path');
var fs = require('fs');
var dirTree = require('directory-tree');
var _ = require('lodash');

module.exports.getProjectJSON = function(bundleId) {
  var bundlePath = path.join(__dirname, '..', '..', 'bundles', bundleId);
  var bundle = dirTree(bundlePath);
  // filter .DS_Store objects out of tree
  var traverseTree = function(node) {
    var nodesToDelete = [];
    if (node.children && node.children.length > 0) {
      for (var i = 0; i < node.children.length; i++) {
        if (node.children[i].name === '.DS_Store') {
          node.children.splice(i, 1);
          continue;
        }
        traverseTree(node.children[i]);
      }
    }
  }
  traverseTree(bundle);
  return bundle;
}