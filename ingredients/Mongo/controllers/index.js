var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
var Item;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We\'re connected to MongoDB');

  var itemSchema = mongoose.Schema({
    title: String,
    text: String
  });

  Item = mongoose.model('Item', itemSchema);
});//connect and say success or error

module.exports = {
  items: {
    get: function(req, res) {
      Item.find(function(err, items) {
        if (err) {
          return console.error(err);
        }
        res.status(200).send({results: items});
      });
    }, // a function which handles a get request for all messages
    post: function(req, res) {
      var itemToAdd = new Item({
        title: req.body.title,
        text: req.body.text
      });
      itemToAdd.save(function(err, itemToAdd) {
        if (err) {
          return console.error(err);
        }
        res.status(201).send(itemToAdd);
      });
    }
  }
};