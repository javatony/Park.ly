var express = require('express');
var router = express.Router();
var model = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  model.Spot.findAll().then(function(spot){
  var user = spot[3]
  var spot1 = Spot.create(price: 4, address: "")
  user.setSpot([])

    res.render('index', { title: 'Hello', spot: spot[3].dataValues })
  })
  // console.log(data)
  // model.User.create

});

module.exports = router;
