var express = require('express');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

var bundler = require('./util/bundler/index.js');

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/bundle/:id', (req, res) => {
  var fileName = req.params.id + '.tar.gz';
  res.download(path.resolve(__dirname, 'bundles', fileName ));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client','public','index.html'));
});

app.post('/build/', function (req, res) {
  bundler(req.body, function(url) {
    res.status(201).send(url)
  });
});

app.get('/homepage', function (req, res) { //just a test route
  console.log('we got the request');
  res.send('you done connected');
});


var server = app.listen(3000, function () {
  console.log('Project-Init Listening on 3000 yo');
});

module.exports = server;