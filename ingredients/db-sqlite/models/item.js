var db = require('../config');

var Item = db.Model.extend({
  tableName: 'items',
  hasTimestamps: true,
});

module.exports = Item;
