var app = angular.module('DiscoveryApp', ['ngRoute']);

app.config(function ($routeProvider){ $routeProvider
  .when('/users/login', {
    controller: 'LoginController',
    templateUrl: 'js/views/login.html',
    // controllerAs: 'vm'
  })
  .when('/users/register', {
    controller: 'RegisterController',
    templateUrl: 'js/views/register.html',
    // controllerAs: 'vm'
  })
  .when('/spots/show', {
    controller: 'ShowController',
    templateUrl: 'js/views/show.html'
  })
  .when('/spots/new',{
    controller: 'SpotsController',
    templateUrl: 'js/views/create_spot.html'
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

app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
});

