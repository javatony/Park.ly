app.controller('RegisterController', ['$scope', '$http', '$window', '$uibModalInstance', function($scope, $http, $window, $uibModalInstance){
  $scope.formData = {}

  $scope.processForm = function(){
    var data = angular.copy($scope.formData)
    console.log(data)
    $http({
      method: 'POST',
      // withCredentials: true,
      url: 'http://localhost:3001/users',
      data: data,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .success(function(response){
      console.log(response)
      document.cookie = response;
      $uibModalInstance.dismiss('cancel')
      $window.location.reload();
    })
    .error(function(response){
      console.log(response)
      console.log("you got an error")
    })
    // $http.post('localhost:8080/users/login', data)
    //   .success(function(response){
    //     console.log(response)
    //   })
  }

   $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);
