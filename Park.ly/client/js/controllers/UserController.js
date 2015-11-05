
app.controller('UserController', ['$scope', '$cookies', '$http', "$routeParams", function($scope, $cookies, $http, $routeParams){

  $scope.checkLogin = function () {
    if ($cookies.get("id") != undefined ) {
      return true
    } else {
      return false
    }
  }

  // console.log($routeParams.u_id)
  if ($routeParams.u_id) {
    $http({
      method: 'GET',
      url: ('http://localhost:3001/users/' + $routeParams.u_id + '/profile'),
      headers:{
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .success(function(response){
      console.log(response)
      $scope.reservations = response.reservations
      $scope.user_id = $routeParams.u_id
      $scope.userFirstName = response.user.first_name
      $scope.spots = response.spots
    })
    .error(function(err){
      console.log(err)
    })
  }
}])
