var express = require('express');
var router = express.Router();
var models = require('../models');

// User creation route
router.post('/', function(req, res) {
  models.User.create({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password})
  res.redirect('../');
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
router.put('/:id', function(req, res, next){
  res.send('you are updating user id ' + req.params.id)
});

// User delete route
router.delete('/:id', function(req, res, next){
  res.send('you are deleting user id ' + req.params.id)
});

// User login route
router.get('/login', function(req, res, next) {
  res.send('form for login');
});

// User login route
router.post('/login', function(req, res, next) {
  res.send('submitting login form');
});

// User logout route
router.get('/logout', function(req, res, next) {
  console.log(req.params.id)
  res.send("this route should log user out and redirect '/'");
});

module.exports = router;
