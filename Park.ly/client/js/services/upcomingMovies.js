app.factory('upcomingMovies', ['$http', function($http) {
  return $http.jsonp('http://api.themoviedb.org/3/movie/upcoming?api_key=968cca12b1a8492036b1e1e05af57e3f&callback=JSON_CALLBACK')
  .success(function(data) {
    return data;
  })
  .error(function(err) {
    return err;
  });
}]);
