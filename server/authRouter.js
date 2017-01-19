var express = require('express');
var authRouter = express.Router();
var path = require('path');
var axios = require('axios');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var config = require('./config.js').github;
var GITHUB_CLIENT_ID = config.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = config.GITHUB_CLIENT_SECRET;
var session = require('express-session');
var git = require('simple-git')();
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

authRouter.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
authRouter.use(passport.initialize());
authRouter.use(passport.session());

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/callback"
  }, function(accessToken, refreshToken, profile, done) {
    profile.token = accessToken;
    return done(null, profile);
  }));
passport.serializeUser(function(profile, done) {
  done(null, profile);
  });
  passport.deserializeUser(function(profile, done) {
  done(null, profile);
});

authRouter.get('/github', passport.authenticate('github', {scope : ['repo user:email'], failureRedirect: '/'}));

authRouter.get('/me', function(req, res){
  res.status(200).send(req.user);
});

authRouter.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

authRouter.get('/callback', passport.authenticate('github', { failureRedirect: '/' }), function(req, res) {
  var uniquePath = path.join(__dirname, 'bundles', req.user.username);
  fs.existsAsync(uniquePath)
    .then((exists) => {
      if ( !exists ) {
        fs.mkdirAsync(uniquePath)
          .then((err) => {
            if ( err ) {
              console.log(new Error(err));
            }
          })
          .catch((err) => {
            console.log(new Error(err));
          });
      }
    })
    .catch((err) => {
      // console.log(new Error(err));
    });
  var user = {
    userid: req.user.id,
    username: req.user.username,
    projectName: undefined
  }
  res.locals.user = user;
  res.status(300).redirect('/'); //REDIRECT TO HOME??
});

authRouter.post('/push', function(req, res) {
  axios.post('https://api.github.com/user/repos', {
    name: req.body.user.projectName,
    description: 'Project started on Stack Bear :]',
  }, {
    headers: {
      Authorization: 'token ' + req.user.token
    }
  })
  .then(function (response) {
    console.log('successful repo create\npushing files into repo');
    var rootDirectory = path.resolve(__dirname, 'bundles', req.user.username, req.body.user.projectName);
    var gitHubUrl = req.user.profileUrl + '/' + req.body.user.projectName + '.git';
    var accessToken = req.user.token;
    git.cwd(rootDirectory)
      .init()
      .addRemote('stackBear', gitHubUrl)
      .add('.')
      .commit('Initial commit from Stack Bear. Good luck hacking!')
      .push('stackBear', 'master')
      .removeRemote('stackBear');
    res.status(201).send('successful');
  })
  .catch(function(err) {
    console.log('error pushing to github');
    res.status(422).send('unsuccessful github push');
  });
});

module.exports = authRouter;