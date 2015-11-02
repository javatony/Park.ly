app.controller('SpotsController', ['$scope', '$http', function($scope, $http){
  $scope.formData = {}
  $scope.processForm = function(){
    // copying form data
    var data = angular.copy($scope.formData)
    console.log(data)

    var rawAddress = data.address
    var finalAddress = rawAddress.split(' ').join('+')

    console.log(finalAddress)
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + finalAddress + "&key=AIzaSyCi72FpZOhti2We62SYVS8NQ9pQPO9Wk1E", function(results){
    var newLat = results.results[0].geometry.location.lat;
    var newLng = results.results[0].geometry.location.lng;
      console.log(results);
      console.log("lat " + newLat);
      console.log("long " + newLng);
    }).done(function(results){
      data.lat = results.results[0].geometry.location.lat
      data.lng = results.results[0].geometry.location.lng
      // console.log(data)
      $http({
        method: 'POST',
        // withCredentials: true,
        url: 'http://localhost:3001/spots',
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function(response){
        console.log(response)
      })
      .error(function(response){
        console.log(response)
        console.log("you got an error")
      })
    })





  }
}]);


