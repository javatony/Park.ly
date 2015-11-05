app.controller('LoginController', ['$scope', '$http', '$routeParams', '$uibModalInstance', '$rootScope', function($scope, $http, $routeParams, $uibModalInstance, $rootScope){
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
      console.log("inside success repsonse")
      document.cookie = response;

      $uibModalInstance.dismiss('cancel')
    })
    .error(function(response){
      $scope.loginError = response;

      $scope.error = function(){
        return true
      }
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
      console.log(err.error)
    })
  }

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };



}]);
