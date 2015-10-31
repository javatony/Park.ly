app.controller('MovieController', ['$scope', 'movies', '$routeParams', function($scope, movies, $routeParams) {
  movies.success(function(data){
    $scope.movie = data.results[$routeParams.id];
  })

  renderMap();

  $("#myLocation").on('click', function(){

    map.remove();

    $('#mapStarter').append('<div id="map"></div>');

    getLocation();

  });

}]);
