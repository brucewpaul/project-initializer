var mongoose = require('mongoose');

var packageRelationSchema = mongoose.Schema({
  package: String,
  otherPackage: String,
  framework: String
});

PackageRelation = mongoose.model('PackageRelation', packageRelationSchema);

module.exports = PackageRelation;