var Package = require('../models/package.js');
var Relationship = require('../models/package_relation.js');
var PackageStat = require('../models/package_stat.js');


// Package
//
module.exports.retreiveAllPackages = function() {
  Package.find(function(err, packages) {
    if (err) {
      return console.error(err);
    }
    return packages;
  });
}

module.exports.retreivePackage = function(pkg) {
  Package.findOne({ 'name': pkg.name }, function(err, package) {
    if (err) {
      return console.error(err);
    }
    return package;
  });
}

module.exports.createPackage = function(pkg) {
  var packageToAdd = new Package({
    name: pkg.title,
    name: pkg.description,
  });

  packageToAdd.save(function(err, packageToAdd) {
    if (err) {
      return console.error(err);
    }
    return packageToAdd;
  });
}

// Package Stat

module.exports.incrementPackageStat = function(pkg, cb) {
  Model.findAndModify(
    {
      $or: [
        { 'package': pkg.package, 'otherPackage': pkg.otherPackage, 'framework': pkg.framework },
        { 'otherPackage': pkg.package, 'package': pkg.otherPackage, 'framework': pkg.framework }
      ]
    },
    { $inc: { fieldToIncrement: 1 } },
    function(err, relationship) {
      if (err) {
        cb(new Error(err));
      }
      cb(relationship);
    }
  );
}

// Package Relationship

module.exports.retreiveAllRelationships = function(cb) {
  // get all relationships
  Relationship.find(function(err, relationship) {
    if (err) {
      cb(new Error(err));
    }
    cb(relationship);
  });
}

module.exports.retreiveRelationship = function(pkg, cb) {
  // get all relationships with a package and a framework
  Relationship.find({
    $or: [
      { 'package': pkg.package, 'framework': pkg.framework},
      { 'otherPackage': pkg.otherPackage, 'framework': pkg.framework}
    ] }, function(err, relationship) {
      if (err) {
        cb(new Error(err));
      }
      cb(relationship);
  });
}

module.exports.createRelationship = function(pkg, cb) {
  // add new relationship
  var framework = pkg.framework || null
  var packageToAdd = new Relationship({
    package: pkg.package,
    otherPackage: pkg.otherPackage,
    framework: framework
  });

  console.log(packageToAdd)

  packageToAdd.save(function(err, packageToAdd) {
    if (err) {
      cb(new Error(err));
    }
    cb(packageToAdd);
  });
}