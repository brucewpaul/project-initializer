var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var items = [];

var router = express.Router(); //router will handle all calls to /API
router.use(function(req, res, next) {
  console.log('Router received request to \''+ req.originalUrl + '\' and will redirect to the appropriate route');
  next();
}); //basic format of middleware. Purpose here is to display endpoint in terminal

router.route('/items') //now we will define what to do with the different types of requests sent to /items (within the /api/ that this router is made to handle)
  .post(function(req, res) {
    var item = {};
    for (var key in req.body) {
      item[key] = req.body[key];
    }
    items.push(item);
    res.json({message: 'item saved!', data: items});
  })

  .get(function(req, res) {
    res.json({data: items});
  })

app.use('/api', router); //this is where we assign router to all requests starting with /api

var server = app.listen(3000, function () {
  console.log('Your basic-server is listening on 3000\nGo to \'127.0.0.1:3000\' in a browser to access your web-application!');
});
module.exports = server;

//post items, users
//