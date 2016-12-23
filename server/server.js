var express = require('express');
var app = express();
const path = require('path');

app.use(express.static(__dirname + '../client/public'));

app.get('/', function (req, res) {
  res.send('you done connected');
});

app.listen(3000, function () {
  console.log('Project-Init Listening on 3000');
});

