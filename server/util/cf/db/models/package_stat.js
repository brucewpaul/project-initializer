var mongoose = require('mongoose');

var packageStatSchema = mongoose.Schema({
  package: String,
  otherPackage: String,
  react: {type: Number, default: 0 },
  angular: {type: Number, default: 0 },
  all: {type: Number, default: 0 }
});

PackageStat = mongoose.model('PackageStat', packageStatSchema);

module.exports = PackageStat;