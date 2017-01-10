var Package = require('../models/package.js');
var Relationship = require('../models/package_relation.js');
var PackageStat = require('../models/package_stat.js');


// Package
//
module.exports.retreiveAllPackages = function() {
  return new Promise (function(resolve, reject) {
    Package.find(function(err, packages) {
      if (err) {
        reject(console.error(err));
      }
      resolve(packages);
    });
  });
}

module.exports.retreivePackage = function(pkg) {
  return new Promise (function(resolve, reject) {
    Package.findOne({ 'name': pkg.name }, function(err, package) {
      if (err) {
        reject(console.error(err));
      }
      resolve(package);
    });
  });
}

module.exports.createPackage = function(pkg) {
  return new Promise (function(resolve, reject) {
    var packageToAdd = new Package({
      name: pkg.title,
      name: pkg.description,
    });

    packageToAdd.save(function(err, packageToAdd) {
      if (err) {
        reject(console.error(err));
      }
      resolve(packageToAdd);
    });
  });
}

// Package Stat

module.exports.incrementPackageStat = function(pkg) {
  console.log('pk', pkg)
  return new Promise (function(resolve, reject) {
    var action = {};
    action[pkg.framework] = 1;

    PackageStat.findOneAndUpdate(
      { 'package': pkg.package, 'otherPackage': pkg.otherPackage },
      { $inc: action },
      { upsert: true, 'new': true },
      function(err, relationship) {
        if (err) {
          reject(new Error(err));
        }
        resolve(relationship);
      }
    );
  });
}

// Package Relationship

module.exports.retreiveAllRelationships = function() {
  // get all relationships
  return new Promise (function(resolve, reject) {
    Relationship.find(function(err, relationship) {
      if (err) {
        reject(new Error(err));
      }
      resolve(relationship);
    });
  });
}

module.exports.retreiveRelationship = function(pkg) {
  // get all relationships with a package and a framework
  // console.log(pkg)
  return new Promise (function(resolve, reject) {
    Relationship.find({
      $or: [
        { 'package': pkg.package, 'framework': pkg.framework},
        { 'otherPackage': pkg.otherPackage, 'framework': pkg.framework}
      ] }, function(err, relationship) {
        if (err) {
          Reject(new Error(err));
        }
        resolve(relationship);
    });
  })
}

module.exports.createRelationship = function(pkg, cb) {
  // add new relationship
  return new Promise (function(resolve, reject) {
    var framework = pkg.framework || null
    var packageToAdd = new Relationship({
      package: pkg.package,
      otherPackage: pkg.otherPackage,
      framework: framework
    });

    console.log(packageToAdd)

    packageToAdd.save(function(err, packageToAdd) {
      if (err) {
        reject(new Error(err));
      }
      resolve(packageToAdd);
    });
  });
}