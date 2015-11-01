var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt');

router.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
   next();
})
// User creation route
router.post('/', function(req, res) {
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
      // Store hash in your password DB.
      models.User.create({first_name:req.body.first_name, last_name:req.body.last_name, email:req.body.email, password:hash})
      res.send({ message: 'created!!!!'})
      });
  });
  // res.redirect('../');
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


