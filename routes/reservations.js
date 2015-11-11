var express = require('express');
var router = express.Router();
var models = require('../models');
var client = require('twilio')('AC7286cd2e5a5ca119759bb77f63a4e85e', '3697b44b02f9be75b993003f8ddca389');

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
          client.sendMessage({
      to:'+14155186960',
      from:'+16505499594',
      body: 'Your reservation has been succesfully cancelled.'
    }), function(err, responseData){
      if (!err) { // "err" is an error received during the request, if any

          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1

          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."

      }
    }
      res.send({ message: 'deleted!!!!'})
      // res.redirect('../')
    })
  })
});


module.exports = router;
