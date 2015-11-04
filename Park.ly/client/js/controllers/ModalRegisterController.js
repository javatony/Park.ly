app.controller('ModalRegisterController', ['$scope', '$uibModal', '$log', '$cookies', function($scope, $uibModal, $log, $cookies){

  $scope.animationsEnabled = true;
// -------------------------------------------------
  $scope.openReg = function (size) {

    var modalInstance2 = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent2.html',
      controller: 'RegisterController',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance2.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
// -------------------------------------------------

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

  $scope.checkLogin = function () {
    if ($cookies.get("id") != undefined ) {
        return true
    } else {
      return false
    }
  };

}]);
