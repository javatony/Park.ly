app.controller('MapController', ['$scope', '$http', function($scope, $http) {

  renderMap();
  //Use my location
  $("#myLocation").on('click', function(){
    map.remove();
    $('#mapStarter').append('<div id="map"></div>');
    getLocation();
  });

  $scope.formData = {}
  $scope.processForm = function(){

    var data = angular.copy($scope.formData);
    console.log(data)
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
