var express = require('express');
var router = express.Router();
var models = require('../models');
var jquery = require('jquery');
var client = require('twilio')('AC7286cd2e5a5ca119759bb77f63a4e85e', '3697b44b02f9be75b993003f8ddca389');
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

//Reserving a spot. Still needs start date and end date!!!!!!
router.post('/:id/reservation', function(req, res, next){
  models.Reservation.create({SpotId:req.params.id, start_date_time: req.body.start_date_time,end_date_time: req.body.end_date_time,UserId: req.body.userId})
  .then(function(){

    console.log('INSIDE SPOT ROUTE UNDER Reservation')

    client.sendMessage({
      to:'+14155186960',
      from:'+16505499594',
      body: 'Your reservation has been made.'
    }), function(err, responseData){
      if (!err) { // "err" is an error received during the request, if any

          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1

          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."

      }
    }
    res.send({ message: 'created!!!!'});
  })
})


module.exports = router;
