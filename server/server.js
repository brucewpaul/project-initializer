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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client','public','index.html'));
});

var options = {
 frontEnd:{
   framework: 'React',
   styling: 'Javascipt/html/css'
 },
 backEnd: {
   database: 'Sqlite3'
 },
 devTools: {
   taskRunner: {
     name: 'grunt',
     plugins:['cssmin', 'uglify'],
     tasks:[
     {
       name: 'cssmin',
       plugins:['cssmin']
     },
     {
       name:'uglify',
       plugins:['uglify']
     },
     {
       name: 'build',
       plugins: ['cssmin', 'uglify']
     }
     ]
   },
   bundler:{
     name: 'webpack',
     config:[]
   },
   testing: 'mocha/chai'
 }
}

app.post('/build/', function (req, res) {

  bundler(options, function(url) {
    bundleUrl = path.join(__dirname, 'bundles', url)
    var file = fs.readFileAsync(bundleUrl, 'binary')
      .then(() => {
        res.setHeader('Content-Length', bundleUrl.length);
        res.write(bundleUrl, 'binary');
        res.end();
      })
      .catch((e) => {
        res.status(500).send('Something broke!')
      });


  });


  // res.send('you done connected');
});

app.get('/homepage', function (req, res) { //just a test route
  console.log('we got the request');
  res.send('you done connected');
});


var server = app.listen(3000, function () {
  console.log('Project-Init Listening on 3000 yo');
});

module.exports = server;