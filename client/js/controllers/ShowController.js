app.controller('ShowController', ['$scope', '$cookies', '$http', '$routeParams', function( $scope, $cookies, $http, $routeParams){

  $scope.checkLogin = function () {
    if ($cookies.get("id") != undefined ) {
      return true
    } else {
      return false
    }
  }

// FIND reservation to pass to show view
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

    if ($cookies.get('start') === undefined){
      data.start_date_time = Date();
      data.end_date_time = Date();
    }
    console.log(data);
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

}])

