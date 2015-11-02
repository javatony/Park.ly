var express = require('express');
var router = express.Router();
var models = require('../models');
var jquery = require('jquery');

// Get all spots route
router.get('/', function(req, res) {
  models.Spot.findAll().then(function(spots){
    res.send(spots)
  })
  // res.send({ message: 'created!!!!'})
  // res.redirect('../');
});

// Spot creation route
router.post('/', function(req, res) {
  console.log(req.body)
  models.Spot.create(req.body)
  models.Spot.findAll().done(function(spots){
    console.log("inside promise")
    res.send(spots)
  })
  // console.log("inside post route")
  // res.redirect('../');
});

// Show Spot
router.get('/:id', function(req, res, next) {
  models.Spot.findById(req.params.id)
  .then(function(spot){
    res.send({spot: spot})
  })
});

// Spot update route. Send Updated alert and Redirect
router.put('/:id', function(req, res, next) {
  models.Spot.findById(req.params.id)
  .then(function(spot){
    spot.update(req.body).then(function() {

      res.send({ message: 'updated!!!!'})
      // res.redirect('../')
    })
  })
});

// Spot delete route. Send delete alert and Redirect
router.delete('/:id', function(req, res, next) {
  models.Spot.findById(req.params.id)
  .then(function(spot){
    spot.destroy().then(function() {
      res.send({ message: 'deleted!!!!'})
      // res.redirect('../')
    })
  })
});


module.exports = router;
