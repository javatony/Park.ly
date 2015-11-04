app.controller('ShowController', ['$scope', '$cookies', function($scope, $cookies){

  console.log(" inside ShowController")

  $scope.checkLogin = function () {
    if ($cookies.get("id") != undefined ) {
      return true
    } else {
      return false
    }
  }
}])

