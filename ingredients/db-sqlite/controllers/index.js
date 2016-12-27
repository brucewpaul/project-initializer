var Items = require('../collections/items');
var Item = require('../models/item');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

console.log('inside controller');

module.exports = {
  items: {
    get: function(req, res) {
      Item.where({}).fetchAll().then(function(items) {
        res.status(200).send(items);
      });
    }, // a function which handles a get request for all messages
    post: function(req, res) {
      Items.create({
        text: req.body.text,
      })
      .then(function(newLink) {
        res.status(200).send(newLink);
      });
    }
  }
};