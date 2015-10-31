app.controller('UpcomingController', ['$scope', 'upcomingMovies', function($scope, upcomingMovies){
  upcomingMovies.success(function(data){
    $scope.movies = data.results;
  })
}])
