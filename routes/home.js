var express = require('express');
var homecontroller = express.Router();

/* GET home page. */
homecontroller.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET test page. */
homecontroller.get('/test', function(req, res) {
  res.render('test', { title: 'Test Page' });
});


module.exports = homecontroller;
