var express = require('express');
var router = express.Router();
var models = require('../models');

// var models = require('../models')

// make reservation ***************PENDING********DATETIME ALGORITHM
router.post('/', function(req, res) {
  models.Spot.findById(req)
  models.Reservation.create(req.body)
  res.send({ message: 'created!!!!'})
  // res.redirect('../');
});

// Show Reservation
router.get('/:id', function(req, res, next) {
  models.Reservation.findById(req.params.id)
  .then(function(reservation){
    res.send({reservation: spot})
  })
});

// Reservation update route. Send Updated alert and Redirect
router.put('/:id', function(req, res, next) {
  models.Reservation.findById(req.params.id)
  .then(function(reservation){
    reservation.update(req.body).then(function() {

      res.send({ message: 'updated!!!!'})
      // res.redirect('../')
    })
  })
});

// Reservation delete route. Send delete alert and Redirect
router.delete('/:id', function(req, res, next) {
  models.Reservation.findById(req.params.id)
  .then(function(reservation){
    reservation.destroy().then(function() {
      res.send({ message: 'deleted!!!!'})
      // res.redirect('../')
    })
  })
});


module.exports = router;
