app.factory('spot', [ function() {

  var data = {
    address: "2 Adobe Creek Way, Los Altos, CA 94022",
    price: 2,
    description: "One fancy parking spot!",
    distance: "4 miles"
  }

  return data
  // return $http.jsonp('https://api.themoviedb.org/3/movie/popular?api_key=968cca12b1a8492036b1e1e05af57e3f&callback=JSON_CALLBACK')
  // .success(function(data) {
  //   return data;
  // })
  // .error(function(err) {
  //   return err;
  // });
}]);

app.factory('spots', [ function() {

  return $http.jsonp('http://localhost:3001/spots')
  .success(function(data) {
    return data;
  })
  .error(function(err) {
    return err;
  });
}]);
