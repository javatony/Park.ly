var express = require('express');
var router = express.Router();
var models = require('../models');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {

  // var available_spots = []
  // var input_start = new Date()
  // var input_end = new Date()
  // console.log(input_end)
  // console.log(input_start)
  // models.Spot.findAll().then(function(spots){

  //   include: [ models.Reservation ]

  //   for (var i = 0; i < spots.length; i++){

  //     //console.log("Spots length is "+ spots.length)
  //     console.log("I is currently " + i)
  //     if (input_end > spots[i].end_date_time || input_start < spots[i].start_date_time) {
  //       if (i === spots.length - 1){
  //         res.send(available_spots)
  //       }
  //       continue;
  //     } else { //If request is within Spot range

  //         if (spots[i].dataValues.reservations === undefined ){
  //           console.log("i is...." + i)
  //           console.log(spots.length)
  //           available_spots.push(spots[i])
  //           if (i === spots.length - 1){
  //             console.log("ii =" + i)
  //             console.log("aasdvhjavdbjashdjkasjdsakd")
  //             res.send(available_spots)
  //           }
  //         }

  //       models.Reservation.findAll({where:{SpotId: spots[i].id}})
  //       .then(function(reservations){
  //         console.log("In model promise")
  //         for (var j = 0; j < reservations.length; j++){
  //           if (input_start < reservations[j].end_date_time && reservations[j].start_date_time < input_end){
  //             // j = reservations.length - 1
  //             break; //if there is a conflict with reservation, break out of loop
  //           }
  //           if (j === (reservations.length - 1)){
  //             // console.log(reservations[j].SpotId)
  //             // models.Spot.findById(reservations[j].SpotId).then(function(spot){
  //               available_spots.push(spots[i - 1])
  //           }
  //           if (i === (spots.length-1) && j === (reservations.length -1) ){
  //             res.send(available_spots)
  //           }
  //         }
  //       })//end inner-then promise
  //     }//end else statement
  //   }

  // })
});

/* Sorting spot algorithim */
// Need to Filter by reservation

router.post('/', function(req, res, next){

  var input_start = new Date((req.body.start_date_time).replace("T", " "))
  var input_end = new Date((req.body.end_date_time).replace("T", " "))
  console.log(input_end)
  console.log(input_start)
    var results = []
    var allSpots = []
    var filteredSpots = []

    async.series([
      function(callback){
        models.Spot.findAll({include: [models.Reservation]}).done(function(spots){
          allSpots = spots
          callback();
        })
      },
      function(callback){
        for(var i = 0; i < allSpots.length; i++){
          if((input_start < allSpots[i].dataValues.start_date_time) || (input_end > allSpots[i].dataValues.end_date_time)){
            continue;
          }else{
            filteredSpots.push(allSpots[i])
          }
        }
        console.log(filteredSpots.length)
        callback();
      },
      function(callback) {
        for(var i = 0; i < filteredSpots.length; i++){
          if (filteredSpots[i].dataValues.Reservations.length === 0){
            results.push(filteredSpots[i])
          }else{
            for(var j = 0; j < filteredSpots[i].dataValues.Reservations.length; j++){
              if((input_end < filteredSpots[i].dataValues.Reservations[j].start_date_time) || (input_start > filteredSpots[i].dataValues.Reservations[j].end_date_time)){
                if (j == filteredSpots[i].dataValues.Reservations.length - 1){
                  results.push(filteredSpots[i]);
                }
                // continue
              }
            }
          }
        }
        res.send(results)
        callback();
      }
    ]);

// -------------------NEWWW ALGORITHM BUT HITS BASE CASE TOO MANY TIME------------------
  // var results = [];
  // var i = 0;
  // var input_start = new Date((req.body.start_date_time).replace("T", " "))
  // var input_end = new Date((req.body.end_date_time).replace("T", " "))


  // models.Spot.findAll().done(function(spots){
  //   models.Reservation.findAll({ where:{ SpotId: spots[0].id }}).done(function(reservations){
  //     checker(reservations,0,spots)})
  // })

  // function checker(reservations, i, spots){

  //   if(i === spots.length -1 ){
  //     // console.log("results: "+JSON.stringify(results))
  //     console.log("**************** " + i )
  //     console.log("results: " + results.length)
  //     // res.send(results);
  //     return results;
  //   }
  //   if(reservations.length === 0){
  //         console.log("current spots index where there is no reservation!!!!!!: " + i)
  //         // console.log("spots is thiiissss!!!!!!!!!!"+spots[i])
  //       models.Reservation.findAll({ where:{ SpotId: spots[i+1].id }}).done(function(reservations){checker(reservations,i+1,spots) })
  //   }
  //   for(var j = 0; j < reservations.length; j++){
  //         console.log("total reservation length" + reservations.length)
  //         console.log("current spots index: " + i, "current reservation index: "+j)

  //     if((input_start < reservations[j].end_date_time) && (reservations[j].start_date_time < input_end)) {
  //        console.log("THERE IS CONFLICT")
  //       break;
  //     }
  //     if(j === (reservations.length-1)){
  //        console.log('PUSHING TO ARRAY')
  //        console.log(spots[i])
  //        results.push(spots[i])
  //     }
  //   }
  //    models.Reservation.findAll({ where:{ SpotId: spots[i+1].id }}).done(function(reservations){`   ` ` `  })
  // }



// ---------------------------------------OLD ALGORITHM------------------------------------
//   var available_spots = []

//   var input_start = new Date((req.body.start_date_time).replace("T", " "))
//   var input_end = new Date((req.body.end_date_time).replace("T", " "))
//   console.log(input_end)
//   console.log(input_start)
//   models.Spot.findAll().then(function(spots){

//     include: [ models.Reservation ]

//     for (var i = 0; i < spots.length; i++){

//       //console.log("Spots length is "+ spots.length)
//       console.log("I is currently " + i)
//       if (input_end > spots[i].end_date_time || input_start < spots[i].start_date_time) {
//         if (i === spots.length - 1){
//           res.send(available_spots)
//         }
//         continue;
//       } else { //If request is within Spot range

//           if (spots[i].dataValues.reservations === undefined ){
//             console.log("i is...." + i)
//             console.log(spots.length)
//             available_spots.push(spots[i])
//             if (i === spots.length - 1){
//               console.log("ii =" + i)
//               console.log("aasdvhjavdbjashdjkasjdsakd")
//               res.send(available_spots)
//             }
//           }

//         models.Reservation.findAll({where:{SpotId: spots[i].id}})
//         .then(function(reservations){
//           console.log("In model promise")
//           for (var j = 0; j < reservations.length; j++){
//             if (input_start < reservations[j].end_date_time && reservations[j].start_date_time < input_end){
//               // j = reservations.length - 1
//               console.log("In first if")
//               break; //if there is a conflict with reservation, break out of loop
//             }
//             if (j === (reservations.length - 1)){
//               // console.log(reservations[j].SpotId)
//               // models.Spot.findById(reservations[j].SpotId).then(function(spot){
//                 available_spots.push(spots[i - 1])
//                 console.log("i =" + i, "  j = " + j)
//                 console.log("available spots: "+available_spots);
//                 console.log("reservations.length: "+reservations.length);
//               // })
//             }
//             if (i === spots.length -1 && j === (reservations.length -1) ){
//               console.log("ii =" + i, "  jj = " + j)
//               console.log("aasdvhjavdbjashdjkasjdsakd")
//               res.send(available_spots)
//             }
//           }
//           //return available_spots
//             // console.log("available spots: "+available_spots);
//             // if(i == spots.length - 1){
//             //   res.send(available_spots)
//             // }
//         })//end inner-then promise
//       }//end else statement
//     }

//   })//end outer-then promise
//   // .then(function(){
//   // res.send(available_spots)
//   // console.log(available_spots)
// // })

// //       // if(input_start < spot.end_date_time && spot.start_date_time < input_end){
// //       //   console.log("there is a conflict")
// //       // }else{

// //       //   console.log("no conflicts")
// //   //     }
// //   //   })
// //   // })

})

router.get('/test', function(req, res) {
  console.log("req path: "+req.path)
  res.send('rr')
  // res.redirect('../');
});

module.exports = router;
