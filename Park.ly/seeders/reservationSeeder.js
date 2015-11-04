var models = require("../models")
var faker = require('faker');

var numberOfUsers = 4;
var lastDay = new Date(2016,4,1,0,0)
var numberOfSpots = 8




for (var i = 0; i < numberOfSpots; i++){
  if (i < numberOfSpots / 8) {
    // do monthly
    //starting on month 1
    var day = 30
    var startDate = new Date(2016,2,1,0,0)
    for (var j = 0; j < 200; j++) {
      var endDate = new Date(startDate.getTime() + day * 86400000)
      models.Reservation.create({
        start_date_time: startDate,
        end_date_time: endDate,
        UserId: Math.ceil(Math.random(numberOfUsers) * 10),
        SpotId: i + 1
      })
      if (endDate >= lastDay) {
          break;
      } else {
      startDate = new Date(endDate.getTime() + day * 86400000)
      }
    }

    //starting on month 2
  } else if (i < numberOfSpots / 4) {
    startDate = new Date(2015,3,1,0,0)
    for (var k = 0; k < 200; k++) {
      var endDate = new Date(startDate.getTime() + day * 86400000)
      models.Reservation.create({
        start_date_time: startDate,
        end_date_time: endDate,
        UserId: Math.ceil(Math.random(numberOfUsers) * 10),
        SpotId: i + 1
      })
      if (endDate >= lastDay) {
          break;
      } else {
      startDate = new Date(endDate.getTime() + day * 86400000)
      }
    }

  } else if (i < numberOfSpots / 8 * 3) {
    // do weekly
    //starting on week 1
    var day = 7
    var startDate = new Date(2015,2,1,0,0)
    for (var j = 0; j < 200; j++) {
      var endDate = new Date(startDate.getTime() + day * 86400000)
      models.Reservation.create({
        start_date_time: startDate,
        end_date_time: endDate,
        UserId: Math.ceil(Math.random(numberOfUsers) * 10),
        SpotId: i + 1
      })
      if (endDate >= lastDay) {
          break;
      } else {
      startDate = new Date(endDate.getTime() + day * 86400000)
      }
    }

  } else if (i < numberOfSpots / 4 * 2) {
    //starting on week 2
    startDate = new Date(2015,2,8,0,0)
    for (var k = 0; k < 200; k++) {
      var endDate = new Date(startDate.getTime() + day * 86400000)
      models.Reservation.create({
        start_date_time: startDate,
        end_date_time: endDate,
        UserId: Math.ceil(Math.random(numberOfUsers) * 10),
        SpotId: i + 1
      })
      if (endDate >= lastDay) {
          break;
      } else {
      startDate = new Date(endDate.getTime() + day * 86400000)
      }
    }

  } else if (i < numberOfSpots / 8 * 5) {
    // daily
    //starting on day 1
    var day = 1
    var startDate = new Date(2015,2,1,0,0)
    for (var j = 0; j < 200; j++) {
      var endDate = new Date(startDate.getTime() + day * 86400000)
      models.Reservation.create({
        start_date_time: startDate,
        end_date_time: endDate,
        UserId: Math.ceil(Math.random(numberOfUsers) * 10),
        SpotId: i + 1
      })
      if (endDate >= lastDay) {
          break;
      } else {
      startDate = new Date(endDate.getTime() + day * 86400000)
      }
    }

  } else if (i < numberOfSpots / 4 * 3) {
    //starting on day 2
    startDate = new Date(2015,2,2,0,0)
    for (var k = 0; k < 200; k++) {
      var endDate = new Date(startDate.getTime() + day * 86400000)
      models.Reservation.create({
        start_date_time: startDate,
        end_date_time: endDate,
        UserId: Math.ceil(Math.random(numberOfUsers) * 10),
        SpotId: i + 1
      })
      if (endDate >= lastDay) {
          break;
      } else {
      startDate = new Date(endDate.getTime() + day * 86400000)
      }
    }

  }
};






