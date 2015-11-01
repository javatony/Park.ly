var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  // seeding
  // models.User.create({first_name: "Si Cheng", last_name: "Zhou", email: "2@2.com", password:"12345678"})
  // models.User.create({first_name: "Daniel", last_name: "Huang", email: "1@1.com", password:"12345678"})
  // models.Spot.create({address: "123 123rd ave", start_date_time: new Date(1999,12,12), end_date_time: new Date(2007,12,23), price: 20, UserId: 1})
  // models.Spot.create({address: "456 456th ave", start_date_time: new Date(2008,6,12), end_date_time: new Date(2009,12,23), price: 90, UserId: 2})
  // models.Reservation.create({start_date_time: new Date(2001,12,12), end_date_time: new Date(2001,12,13), UserId: 1, SpotId: 2})
  // models.Reservation.create({start_date_time: new Date(2009,12,12), end_date_time: new Date(2009,12,13), UserId: 2, SpotId: 1})

  // show all available spots

  // show current user's spots & reservations if logged in

  var user_id = 1
  models.User.findById(user_id, {
    include: [ models.Spot,models.Reservation ]})
    .then(function(users) {
      res.render('index', {
      users: users
    });
  });
});

module.exports = router;
