var mongoose = require('mongoose');

var packageRelationSchema = mongoose.Schema({
  package: String,
  otherPackage: String,
  react: String,
  angular: String,
  all: String
});

PackageRelation = mongoose.model('PackageRelation', packageRelationSchema);

module.exports = PackageRelation;