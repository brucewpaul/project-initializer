var express = require('express');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client','public','index.html'));
});

app.get('/homepage', function (req, res) { //just a test route
  console.log('we got the request');
  res.send('you done connected');
});


var server = app.listen(3000, function () {
  console.log('Project-Init Listening on 3000 yo');
});

module.exports = server;