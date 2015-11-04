app.controller('SpotsController', ['$scope', '$http', '$routeParams', '$cookies', '$window', function($scope, $http, $routeParams, $cookies, $window){
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
    // copying form data
    //get user_id from cookie and add to data

    var data = angular.copy($scope.formData)
    console.log(data)
    data.UserId = Number(document.cookie.match(/\d+/).join(''))
    var rawAddress = data.address
    var finalAddress = rawAddress.split(' ').join('+')

    console.log(finalAddress)
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + finalAddress + "&key=AIzaSyCi72FpZOhti2We62SYVS8NQ9pQPO9Wk1E", function(results){
    var newLat = results.results[0].geometry.location.lat;
    var newLng = results.results[0].geometry.location.lng;

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
      $scope.spot = response
    })
    .error(function(error){
      console.log("Your error is response from spot show route " + error)
    })
  }


  $scope.makeReservation = function(){
    var data = {
      userId: $cookies.get('id'),
      start_date_time: $cookies.get('start'),
      end_date_time: $cookies.get('end')
    }
    $http({
      method: 'POST',
      url: 'http://localhost:3001/spots/' + $routeParams.s_id + '/reservation',
      data: data,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .success(function(response){
      console.log(response)
      $scope.changeRoute('#/maps');
    })
    .error(function(err){
      console.log('Reservation failed')
    })
  }

}]);


