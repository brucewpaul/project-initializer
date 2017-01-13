var express = require('express');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
var bundler = require('./util/bundler/index.js');
var filter = require('./util/cf/index.js');
var projectView = require('./util/pv/projectView.js');

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// TODO: refactor out controllers for the routes into a separate file @chan
// app.post('/build', controller.build)

// send object from front end to bundler to build client folder
app.post('/build/', function (req, res) {
  bundler(req.body, function(err, folderName) {
    if ( err ) {
      res.status(500);
    } else {
      var framework = req.body.frontEnd.framework;
      var packages = req.body.devTools.taskRunner.plugins;
      filter.queueConfig(framework, packages);

      res.status(201).send(folderName);
    }
  });
});

app.get('/bundle/:id', (req, res) => {
  var fileName = req.params.id + '.tar.gz';
  res.download(path.resolve(__dirname, 'bundles', fileName ));
});

app.post('/recommendations/', (req, res) => {
  var framework = req.body.framework || null
  var packages = req.body.packages || null
  if ( packages && framework ) {
    filter.getRecommendations({framework, packages}, function(err, recommendations) {
      res.status(200).send(recommendations);
    });
  } else {
    res.status(500);
  }

app.get('/bundle/contents/:id', (req, res) => {
  var bundle = projectView.getProjectJSON(req.params.id);
  res.json(bundle);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client','public','index.html'));
});


var server = app.listen(3000, function () {
  console.log('Project-Init Listening on 3000 yo');
});

module.exports = server;