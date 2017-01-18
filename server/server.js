var express = require('express');
var app = express();
const path = require('path');

var filter = require('ger-neo4j');

var config = require('./config.js');

var bodyParser = require('body-parser');
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


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/auth', authRouter);
app.use('/bundle', bundleRouter);

app.get('/me', function(req, res){
  console.log('me', req.user);
  res.status(200).send(req.user);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client','public','index.html'));
});

var server = app.listen(3000, function () {
  console.log('Project-Init Listening on 3000 yo');
});
