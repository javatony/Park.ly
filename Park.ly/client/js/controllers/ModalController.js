app.controller('ModalController', ['$scope', '$uibModal', '$log', '$cookies', function($scope, $uibModal, $log, $cookies){
 // $scope.items = ['item1', 'item2', 'item3'];

  $scope.userId = $cookies.get("id");
  $scope.animationsEnabled = true;
// -------------------------------------------------
  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'LoginController',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
//-----------------------------------------------------

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


  $scope.logout = function () {
    $cookies.remove("id")
  }

}]);
