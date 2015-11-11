app.controller('MapController', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window) {
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

      newLat = 37.2972057;
      newLng = -121.9578404;

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

  //Use my location
  $("#myLocation").on('click', function(){
    $cookies.put("visited", true)
    map.remove();
    $('#mapStarter').append('<div id="map"></div>');
    getLocation(currentLocations);
  });


  //Error checking for date inputs
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
    $cookies.put("visited", true)

    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + finalAddress + "&key=AIzaSyC7fCLRRT6scDos0V3pHanuNsmvSX_2dtc", function(results){
      if (results.status === "ZERO_RESULTS") {
        sweetAlert("Oops...", "Sorry, we can not locate the address specified, please try again", "error")
      } else {
        $scope.errMessage = "";
        newLat = results.results[0].geometry.location.lat;
        newLng = results.results[0].geometry.location.lng;
      }
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
      })

  }

}]);
