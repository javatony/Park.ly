app.controller('LoginController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
  $scope.formData = {}

  $scope.processForm = function(){
    var data = angular.copy($scope.formData)
    console.log(data)
    $http({
      method: 'POST',
      // withCredentials: true,
      url: 'http://localhost:3001/users/login',
      data: data,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .success(function(response){
      document.cookie = 'token=' + response;
      //logout() //REMOVE THIS? SI CHENG PLEASE?
      // console.log(checkLogin()) //SI CHENG WHAT IS THIS???
      $location.path('#/maps')
    })
    .error(function(response){
      console.log("you got an error")
    })
  }

  if($routeParams.u_id){
    $http({
      method: 'GET',
      url: ('http://localhost:3001/users/' + $routeParams.u_id),
      headers:{
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .success(function(response){
      console.log(response)
      $scope.reservations = response.reservations
      $scope.spots = response.spots
    })
    .error(function(err){
      console.log(err)
    })
  }
}]);
