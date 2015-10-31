var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', function(req, res, next) {
  console.log(req.params.id)
  res.send('you are in reservation page for ' + req.params.id);
});
