var app = angular.module('DiscoveryApp', ['ngRoute']);

app.config(function ($routeProvider){ $routeProvider
  .when('/users/login', {
    controller: 'LoginController',
    templateUrl: 'js/views/login.html'
  })
  .when('/users/register', {
    controller: 'RegisterController',
    templateUrl: 'js/views/register.html'
  })
  .when('/spots/show', {
    controller: 'ShowController',
    templateUrl: 'js/views/show.html'
  })
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
    controller: 'MapController',
    templateUrl: 'js/views/map.html'
  })
  .otherwise({
    redirectTo: '/maps'
  })
})

