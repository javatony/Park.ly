app.controller('LoginController', ['$scope', '$http', '$routeParams', '$uibModalInstance', '$rootScope', '$window', function($scope, $http, $routeParams, $uibModalInstance, $rootScope, $window){
  $scope.formData = {}

  $scope.processForm = function(){
    var data = angular.copy($scope.formData)
    $http({
      method: 'POST',
      url: 'http://localhost:3001/users/login',
      data: data,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .success(function(response){
      document.cookie = response;
      $uibModalInstance.dismiss('cancel')
      $window.location.reload()
    })
    .error(function(response){
      $scope.loginError = response;
      $scope.error = function(){
        return true
      }
    })
  }

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);
