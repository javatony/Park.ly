var models = require("../models")
var fs = require('fs');
var request = require("request")

var descriptionArr = ["Made for large cars",
"Made for foreign cars","Made for small cars",
"Safe spot, covered parking","Cheap and safe, no trees",
"Super large spot in safe location", "Very quiet and safe location" ]

var timer = function(array, index) {
    // setTimeout(function(){}, 1000);
    var finalAddress = array[index].split(' ').join('+');

    if (array.length - 1 === index) {
        return
    }

    var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+finalAddress+"San+Francisco+CA&key=AIzaSyCrHRlutQamoYVdca7RM_zS5HPT0JVutrU"
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            // address = body.results[0].formatted_address
            // newlat = body.results[0].geometry.location.lat
            // newlong = body.results[0].geometry.location.lat
            // console.log(newlat+ "  " + newlong +  "   " +address)

            // var json = []
            models.Spot.create({
                "address": body.results[0].formatted_address,
                "lat": body.results[0].geometry.location.lat,
                "lng": body.results[0].geometry.location.lng,
                "price": Math.ceil(Math.random() * 30),
                "UserId": index + 1,
                "description": descriptionArr[Math.floor(Math.random() * descriptionArr.length)],
                "start_date_time": new Date("2015-2-2 12:00:00:01"),
                "end_date_time": new Date("2025-3-2 15:00:00:01")
            })

            // json.push(temp)
        }

        setTimeout(timer(array, index + 1), 1000);

    })
    // return true
}


var array = fs.readFileSync('StreetNamesShort.txt').toString().split("\n");
timer(array, 0);



