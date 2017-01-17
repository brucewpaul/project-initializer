var express = require('express');
var app = express();
const path = require('path');

// var filter = require('./util/cf/index.js');
var filter = require('ger-neo4j');

var config = require('./config.js');

var bodyParser = require('body-parser'); //just has to be applied here before being sent to routers
var authRouter = require('./authRouter');
var bundleRouter = require('./bundleRouter');

var Frameworks = ['React','Angular','Vue'];
var Packages = ['cssmin','watch','uglify','sass'];

filter.init(Frameworks, Packages, config.neo4j, function(err, msg) {
  if ( err ) {
    console.log(err);
  } else {
    console.log(msg);
  }
});

app.use(bodyParser.urlencoded({extended: false})); //uni
app.use(bodyParser.json()); //uni
app.use(express.static(path.join(__dirname, '../client/public'))); //uni
app.use(express.static(path.join(__dirname, '../client/dist'))); //uni
app.use('/auth', authRouter);
app.use('/bundle', bundleRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client','public','index.html'));
});

var server = app.listen(3000, function () {
  console.log('Project-Init Listening on 3000 yo');
});
