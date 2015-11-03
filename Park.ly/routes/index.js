var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  // seeding
  // models.User.create({first_name: "Si Cheng", last_name: "Zhou", email: "2@2.com", password:"12345678"})
  // models.User.create({first_name: "Daniel", last_name: "Huang", email: "1@1.com", password:"12345678"})
  // models.Spot.create({address: "123 123rd ave", start_date_time: new Date(1999,12,12), end_date_time: new Date(2007,12,23), price: 20, UserId: 1})
  // models.Spot.create({address: "123 Test St.", start_date_time: new Date(2015,11,01,09,00), end_date_time: new Date(2015,11,01,10,00), price: 90, UserId: 2})
  // models.Reservation.create({start_date_time: new Date(2009,06,01,09,00), end_date_time: new Date(2009,11,01,20,00), UserId: 1, SpotId: 2})
  // models.Reservation.create({start_date_time: new Date(2008,08,04,09,00), end_date_time: new Date(2008,12,20,20,00), UserId: 1, SpotId: 2})
  // models.Reservation.create({start_date_time: new Date(2000,12,01,09,00), end_date_time: new Date(2005,2,01,20,00), UserId: 1, SpotId: 7})
  // models.Reservation.create({start_date_time: new Date(2012,10,01,09,00), end_date_time: new Date(2012,10,05,20,00), UserId: 1, SpotId: 3})

  // show all available spots
  models.Spot.findAll().done(function(data){
    // console.log("hello")
    res.send(data)
  })
  // show current user's spots & reservations if logged in

  // var user_id = 1
  // models.User.findById(user_id, {
  //   include: [ models.Spot,models.Reservation ]})
  //   .then(function(users) {
  //     res.render('index', {
  //     users: users
  //   });
  // });
});

/* Sorting spot algorithim */
// Need to Filter by reservation
router.post('/', function(req, res, next){

  var available_spots = []

  var input_start = new Date((req.body.start_date_time).replace("T", " "))
  var input_end = new Date((req.body.end_date_time).replace("T", " "))
  console.log(input_end)
  console.log(input_start)
  models.Spot.findAll().then(function(spots){

    include: [ models.Reservation ]

    for (var i = 0; i < spots.length; i++){

      //console.log("Spots length is "+ spots.length)
      console.log("I is currently " + i)
      if (input_end > spots[i].end_date_time || input_start < spots[i].start_date_time) {
        if (i === spots.length - 1){
          res.send(available_spots)
        }
        continue;
      } else { //If request is within Spot range

          if (spots[i].dataValues.reservations === undefined ){
            console.log("i is...." + i)
            console.log(spots.length)
            available_spots.push(spots[i])
            if (i === spots.length - 1){
              console.log("ii =" + i)
              console.log("aasdvhjavdbjashdjkasjdsakd")
              res.send(available_spots)
            }
          }

        models.Reservation.findAll({where:{SpotId: spots[i].id}})
        .then(function(reservations){
          console.log("In model promise")
          for (var j = 0; j < reservations.length; j++){
            if (input_start < reservations[j].end_date_time && reservations[j].start_date_time < input_end){
              // j = reservations.length - 1
              console.log("In first if")
              break; //if there is a conflict with reservation, break out of loop
            }
            if (j === (reservations.length - 1)){
              // console.log(reservations[j].SpotId)
              // models.Spot.findById(reservations[j].SpotId).then(function(spot){
                available_spots.push(spots[i - 1])
                console.log("i =" + i, "  j = " + j)
                console.log("available spots: "+available_spots);
                console.log("reservations.length: "+reservations.length);
              // })
            }
            if (i === spots.length && j === (reservations.length -1) ){
              console.log("ii =" + i, "  jj = " + j)
              console.log("aasdvhjavdbjashdjkasjdsakd")
              res.send(available_spots)
            }
          }
          //return available_spots
            // console.log("available spots: "+available_spots);
            // if(i == spots.length - 1){
            //   res.send(available_spots)
            // }
        })//end inner-then promise
      }//end else statement
    }

  })//end outer-then promise
  // .then(function(){
  // res.send(available_spots)
  // console.log(available_spots)
// })

      // if(input_start < spot.end_date_time && spot.start_date_time < input_end){
      //   console.log("there is a conflict")
      // }else{

      //   console.log("no conflicts")
  //     }
  //   })
  // })

})

router.get('/test', function(req, res) {
  console.log("req path: "+req.path)
  res.send('rr')
  // res.redirect('../');
});

module.exports = router;
