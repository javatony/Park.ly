app.controller('MainController', ['$scope', 'movies', function($scope, movies) {
  movies.success(function(data) {
    $scope.movies = data.results;
  });
}]);
