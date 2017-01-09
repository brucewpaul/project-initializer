var mongoose = require('mongoose');

var packageSchema = mongoose.Schema({
  name: String,
  description: String
});

Package = mongoose.model('Package', packageSchema);

module.exports = Package;