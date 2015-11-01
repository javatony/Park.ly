var express = require('express');
var router = express.Router();
var models = require('../models');

// User creation route
router.post('/', function(req, res) {
  models.User.create(req.body)
  res.send({ message: 'created!!!!'})
  // res.redirect('../');
});

// User profile route
router.get('/:id', function(req, res, next) {
  models.Reservation.findAll({where:{UserId: req.params.id}})
  .then(function(reservations){
    models.Spot.findAll({where:{UserId: req.params.id}})
    .then(function(spots){
      res.send({
        reservations: reservations,
        spots: spots
      });
    })
  })
});

// User update route
router.put('/:id', function(req, res, next) {
  models.Reservation.findById(req.params.id)
  .then(function(reservation){
    reservation.update(req.body).then(function() {
      res.send({ message: 'updated!!!!'})
    })
  })
});

// User delete route
router.delete('/:id', function(req, res, next) {
  models.Reservation.findById(req.params.id)
  .then(function(reservation){
    reservation.destroy().then(function() {
      res.send({ message: 'deleted!!!!'})
    })
  })
});

// User login route ******************* PENDING *******DECIDE AUTHENTICATION TECHNOLOGY FIRST**********
router.post('/login', function(req, res, next) {
  res.send('submitting login form');
});

// User logout route ******************* PENDING *******DECIDE AUTHENTICATION TECHNOLOGY FIRST**********
router.get('/logout', function(req, res, next) {
  console.log(req.params.id)
  res.send("this route should log user out and redirect '/'");
});

module.exports = router;
