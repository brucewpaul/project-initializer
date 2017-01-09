var mongoose = require('mongoose');

var packageStatSchema = mongoose.Schema({
  package: String,
  otherPackage: String,
  framework: String
});

PackageStat = mongoose.model('PackageStat', packageStatSchema);

module.exports = PackageStat;