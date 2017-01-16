var express = require('express');
var app = express();
const path = require('path');
var filter = require('./util/cf/index.js');

var bodyParser = require('body-parser'); //just has to be applied here before being sent to routers
var authRouter = require('./authRouter');
var bundleRouter = require('./bundleRouter');

filter.init(['React','Angular','Vue'], ['cssmin','watch','uglify','sass'], function(err) {
  if ( err ) {
    res.status(500).send(err)
  } else {
    res.status(200).send('neo4j ready to go')
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
