var app = angular.module('Parkly', ['ngRoute']);

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

function checkLogin(){
  if (document.cookie != "") {
    if (document.cookie.match(/token/)[0] === "token") {
      return true
    }
  } else {
    return false
  }
}

function logout(){
  document.cookie += ";expires=Thu, 01 Jan 1970 00:00:00 GMT"
}
