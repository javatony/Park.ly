app.controller('LoginController', ['$scope', '$http', function($scope, $http){
  $scope.formData = {}
  $scope.processForm = function(){
    var data = angular.copy($scope.formData)
    // console.log(data)
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
      console.log(checkLogin())
    })
    .error(function(response){
      console.log(response)
      console.log("you got an error")
      document.cookie = "sadCookie";
    })
  }
}]);
