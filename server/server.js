var express = require('express');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
var bundler = require('./util/bundler/index.js');
var filter = require('./util/cf/index.js');
var projectView = require('./util/pv/projectView.js');
var axios = require('axios');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var GITHUB_CLIENT_ID = "4797b2457cbad7cda803";
var GITHUB_CLIENT_SECRET = "ce2471547163f864e2ef1af5507b1bb9437feca1";
var session = require('express-session');
var fs = require('fs');

var bodyParser = require('body-parser'); //just has to be applied here before being sent to routers
var authRouter = require('./authRouter');
var bundleRouter = require('./bundleRouter');

filter.init(['React','Angular','Vue'], ['cssmin','watch','uglify','sass'], function(err) {
  if ( err ) {
    console.log( err )
  } else {
    console.log('neo4j ready to go')
  }
});

app.use(bodyParser.urlencoded({extended: false})); //uni
app.use(bodyParser.json()); //uni
app.use(express.static(path.join(__dirname, '../client/public'))); //uni
app.use(express.static(path.join(__dirname, '../client/dist'))); //uni
app.use('/auth', authRouter);
app.use('/bundle', bundleRouter);

app.post('/bundle/contents/:id', (req, res) => {
  fs.writeFile(req.body.path, req.body.content, 'utf8', function(err) {
    if (!err) {
      console.log('SUCCESS');
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client','public','index.html'));
});

var server = app.listen(3000, function () {
  console.log('Project-Init Listening on 3000 yo');
});
