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

var accessTokenTemp;
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/callback"
}, function(accessToken, refreshToken, profile, done) {
  accessTokenTemp = accessToken;
  return done(null, profile);
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'repo' ] }),
  function(req, res){//this func doesn't get called. github redirects to other url
  });

app.get('/auth/callback',
  passport.authenticate('github', { failureRedirect: '/rekt' }),
  function(req, res) {
    console.log('access', accessTokenTemp);
    res.redirect('/');
  });

app.get('/push', function(req, res) {
    axios.post('https://api.github.com/user/repos', {
      name: "tes1t"
    }, {
      headers: {
        Authorization: 'token ' + accessTokenTemp
      }
    })
    .then(function (response) {
      console.log('successful repo create');
      res.status(201).send('successful');
    })
    .catch(function(err) {
      console.log('fuck yourself', err);
    });
  })

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
});

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