var app = angular.module('DiscoveryApp', ['ngRoute']);

app.config(function ($routeProvider){ $routeProvider
  .when('/movies', {
    controller: 'MainController',
    templateUrl: 'js/views/movies.html'
  })
  .when('/movies/upcoming', {
    controller: 'UpcomingController',
    templateUrl: 'js/views/upcoming.html'
  })
  .when('/movies/:id', {
    controller: 'MovieController',
    templateUrl: 'js/views/movie.html'
  })
  .when('/movies/upcoming/:id', {
    controller: 'UpcomingMovieController',
    templateUrl: 'js/views/movie.html'
  })
  .when('/maps', {
    controller: 'MovieController',
    templateUrl: 'js/views/map.html'
  })
  .otherwise({
    redirectTo: '/movies'
  })
})

