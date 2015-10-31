var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  // models.Reservation.create({start_date_time: new Date(1999,12,12), end_date_time: new Date(1999,12,13), UserId: 7, SpotId: 2})
  // models.Reservation.create({start_date_time: new Date(1999,12,12), end_date_time: new Date(1999,12,13), UserId: 7, SpotId: 6})
  // models.Reservation.create({start_date_time: new Date(1999,12,12), end_date_time: new Date(1999,12,13), UserId: 7, SpotId: 4})
  models.User.findAll({
    include: [ models.Spot,models.Reservation ]

  }).then(function(users) {

    res.render('index', {
      title: 'Express',
      users: users
    });
  });

});

module.exports = router;
