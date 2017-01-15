var express = require('express');
var app = express();
const path = require('path'); //go in the routers too

var bodyParser = require('body-parser'); //just has to be applied here before being sent to routers
var authRouter = require('./authRouter');
var bundleRouter = require('./bundleRouter');

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

module.exports = server;