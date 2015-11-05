app.controller('IndexController', ['$scope', '$cookies', '$window', function($scope, $cookies, $window){

  $scope.checkLogin = function () {
    if ($cookies.get("id") != undefined ) {
        return true
    } else {
      return false
    }
  }

  $scope.logout = function () {
    $cookies.remove("id")
    $window.location.reload()
  }
  $scope.userId = $cookies.get("id");


}]);

