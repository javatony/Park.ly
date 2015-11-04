app.controller('MapController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
  var currentLocations ;
  // define initialize function for page load
  var initi = function(){
    $http({
      method: 'GET',
      url: 'http://localhost:3001/',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .success(function(allSpots){

      newLat = 37.7846334;
      newLng = -122.3974137;

      allSpots.forEach(function(spot){
        spot.type = "Feature"
        spot.geometry = {
        "type": "Point",
        "coordinates": [spot.lng,spot.lat]
      },
        spot.properties = {
          "image": spot.url,
          "title": "Mapbox DC",
          "description": spot.description,
          "marker-color": "#fc4353",
          "marker-size": "large",
          "marker-symbol": "parking",
          "city": spot.address
        }
      })
      map.remove();
      $('#mapStarter').append('<div id="map"></div>');
      renderMap(allSpots, "hello");
      currentLocations = allSpots;
      console.log(allSpots);
    })
    .error(function(error){
      console.log(error);
    })
  };

  // run initialize function on page load
  initi();
  console.log("*********************");
  // renderMap();
  console.log("*********************");

  //Use my location
  $("#myLocation").on('click', function(){
    map.remove();
    $('#mapStarter').append('<div id="map"></div>');

    getLocation(currentLocations);
  });

  $scope.checkErr = function(start_date_time,end_date_time) {
        $scope.errMessage = '';
        var curDate = new Date();

        if(new Date(start_date_time) > new Date(end_date_time)){
          $scope.errMessage = 'End Date should be greater than start date';
          return false;
        }

        if(new Date(start_date_time) < curDate){
           $scope.errMessage = 'Start date should not be before today.';
           return false;
        }
        return true;
    };
  $scope.formData = {}


  // Get data from query search and post to server to filter
  $scope.processForm = function(){



    var data = angular.copy($scope.formData);
    console.log(data)
    var rawAddress =  data.address;
    var finalAddress = rawAddress.split(' ').join('+');
    //SET QUERY DATES TO COOKIE

    $cookies.put("start", data.start_date_time)
    $cookies.put("end", data.end_date_time)

    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + finalAddress + "&key=AIzaSyC7fCLRRT6scDos0V3pHanuNsmvSX_2dtc", function(results){

      newLat = results.results[0].geometry.location.lat;
      newLng = results.results[0].geometry.location.lng;

    }).done(function(){
      $http({
        method: 'POST',
        // withCredentials: true,
        url: 'http://localhost:3001/',
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function(response){
        response.forEach(function(spot){
          spot.type = "Feature"
          spot.geometry = {
          "type": "Point",
          "coordinates": [spot.lng,spot.lat]
        },
          spot.properties = {
            "image": spot.url,
            "title": "Mapbox DC",
            "url": ('#/spots/' + spot.id + '/show'),
            "description": spot.description,
            "marker-color": "#fc4353",
            "marker-size": "large",
            "marker-symbol": "parking",
            "city": spot.address
          }
        })
        console.log(response)
        map.remove();
        $('#mapStarter').append('<div id="map"></div>');
          renderMap(response);
        })
        .error(function(response){
        console.log(response)
        console.log("you got an error")

        });
      }).fail(function(){
        console.log("Fail");
    });

    // var rawAddress =  data.address;
    // var finalAddress = rawAddress.split(' ').join('+');
    // var jqxhr = $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + finalAddress + "&key=AIzaSyCi72FpZOhti2We62SYVS8NQ9pQPO9Wk1E", function(results){
    //   var newLat = results.results[0].geometry.location.lat;
    //   var newLng = results.results[0].geometry.location.lng;
    //   console.log(results);
    //   console.log(results.results[0].geometry.location.lat);
    //   console.log(results.results[0].geometry.location.lng);




    //   var marker = L.marker(new L.LatLng(newLat, newLng),{
    //     draggable:false
    //   });

    //   marker.bindPopup('Location').openPopup();
    //   marker.addTo(map);
    // })



  }

}]);
