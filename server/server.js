var express = require('express');
var app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/homepage', function (req, res) { //just a test route
  res.send('you done connected');

});

var server = app.listen(3000, function () {

  console.log('Project-Init Listening on 3000 yo');
});

module.exports = server;