app.controller('UpcomingMovieController', ['$scope', 'upcomingMovies', '$routeParams', function($scope, upcomingMovies, $routeParams) {
  upcomingMovies.success(function(data){
    $scope.movie = data.results[$routeParams.id];
  })
}])
