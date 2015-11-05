app.controller('SpotsController', ['$scope', '$http', '$routeParams', '$cookies', '$window', '$location', function($scope, $http, $routeParams, $cookies, $window, $location){
  $scope.formData = {}

  // Send a post request to server for creation

  $scope.changeRoute = function(url, forceReload) {
    $scope = $scope || angular.element(document).scope();
    if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
        window.location = url;
    } else {
        $location.path(url);
        $scope.$apply();
    }
  };

  $scope.checkLogin = function () {
    if ($cookies.get("id") != undefined ) {
      return true
    } else {
      return false
    }
  }

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


  $scope.processForm = function(){


    var data = angular.copy($scope.formData)
    console.log(data)
//    console.log($cookies.get(id))
    console.log($cookies.get("id"))
    data.UserId = $cookies.get("id")//Number(document.cookie.match(/\d+/).join(''))
    var rawAddress = data.address
    var finalAddress = rawAddress.split(' ').join('+')

    console.log(finalAddress)
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + finalAddress + "&key=AIzaSyCi72FpZOhti2We62SYVS8NQ9pQPO9Wk1E", function(results){
    var newLat = results.results[0].geometry.location.lat;
    var newLng = results.results[0].geometry.location.lng;

    }).done(function(results){
      data.lat = results.results[0].geometry.location.lat
      data.lng = results.results[0].geometry.location.lng
      console.log(data)
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
        $window.location.href = '#/maps'
      })
      .error(function(response){
        console.log(response)
        console.log("you got an error")
      })
    })
  }// end of process form

  if($routeParams.s_id){
    console.log($routeParams.s_id)
    $http({
      method: 'GET',
      url: ('http://localhost:3001/spots/' + $routeParams.s_id),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .success(function(response){
      console.log(response)
    })
    .error(function(error){
      console.log("Your error is response from spot show route " + error)
    })
  }




  $scope.deleteRes = function(reservation, id){
    $scope.deleteSuccess = false

    var address = reservation.Spot.address

    $http({
      method: 'DELETE',
      url: 'http://localhost:3001/reservations/' + reservation.id,
      headers:{
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .success(function(response){
      console.log(response)
      var url = "#/users/"+id+"/profile"
      window.location = url;
      window.location.reload();
    })
  }

}]);


