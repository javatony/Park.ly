var express = require('express');
var router = express.Router();
var models = require('../models');

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
  // models.Spot.create(req.body)
  res.send({ message: 'created!!!!'})
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

//Reserving a spot. Still needs start date and end date!!!!!!
router.post('/:id/reservation', function(req, res, next){
  models.Reservation.create({SpotId:req.params.id, start_date_time: req.body.start_date_time,end_date_time: req.body.end_date_time,UserId: req.body.userId})
  .then(function(){
    res.send({ message: 'created!!!!'});
  })
})


module.exports = router;
