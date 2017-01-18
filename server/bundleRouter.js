var express = require('express');
var bundleRouter = express.Router();
var path = require('path');
var bundler = require('./util/bundler/index.js');
// var filter = require('./util/cf/index.js');
var filter = require('ger-neo4j');
var projectView = require('./util/pv/projectView.js');
var fs = require('fs');

bundleRouter.post('/build/', function (req, res) {
  bundler(req, function(err, folderName) {
    if ( err ) {
      res.status(500);
    } else {
      var framework = req.body.frontEnd.framework;
      var packages = req.body.devTools.taskRunner.plugins;
      filter.queueConfig({category: framework, items: packages});

      res.status(201).send(folderName);
    }
  });
});

bundleRouter.get('/:user/:id', (req, res) => {
  var fileName = req.params.id + '.tar.gz';
  res.download(path.resolve(__dirname, 'bundles', req.params.user, fileName ));
});

bundleRouter.get('/contents/:user/:id', (req, res) => {
  var bundle = projectView.getProjectJSON(req.params.user + '/' + req.params.id);
  res.json(bundle);
});

bundleRouter.post('/contents/:user/:id', (req, res) => {
  fs.writeFile(req.body.path, req.body.content, 'utf8', function(err) {
    if (!err) {
      console.log('SUCCESS');
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

bundleRouter.post('/recommendations/', (req, res) => {
  var framework = req.body.framework || null
  var packages = req.body.packages || null
  if ( packages && framework ) {
    filter.getRecommendations({category: framework, items: packages}, function(err, recommendations) {
      if ( err ) {
        res.status(500).send({ error: 'Error in getting recommendations' })
      } else if ( !recommendations ) {
        res.status(500).send({ error: 'There are no recommendations' })
      } else {
        res.status(200).send(recommendations);
      }
    });
  } else {
    res.status(500).send({ error: 'Error in getting recommendations: a framework and an array of packages need to be sent' })
  }
});

module.exports = bundleRouter;