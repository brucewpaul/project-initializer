var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/package-cf');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We\'re connected to MongoDB');
});

module.exports = db;