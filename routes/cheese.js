var express = require('express');
var router = express.Router();
var models = require('../models')


router.get('/', function(req, res, next){

  var available_spots;
  //res.send("cheese test");
  models.Spot.findAll().then(function(spots){
    available_spots = "success1";
     models.Reservation.findAll({where:{SpotId: 8}})
    .then(function(reservations){
      available_spots += "2";
      //res.send(available_spots);
    });
  }).then(function(){
    available_spots += "3"
    res.send(available_spots);
  });
})

router.get('/test', function(req, res) {
  console.log("req path: "+req.path)
  res.send('rr')
  // res.redirect('../');
});

module.exports = router;
