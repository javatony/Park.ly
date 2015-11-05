var app = angular.module('Parkly', ['ngRoute', 'ngCookies', 'ui.bootstrap']);

app.config(function ($routeProvider){ $routeProvider
  .when('/users/login', {
    controller: 'LoginController',
    templateUrl: 'js/views/login.html'
    // controllerAs: 'vm'
  })
  .when('/users/register', {
    controller: 'RegisterController',
    templateUrl: 'js/views/register.html'
    // controllerAs: 'vm'
  })
  .when('/users/:u_id/profile',{
    controller: 'UserController',
    templateUrl: 'js/views/profile.html'
  })
  .when('/spots/show', {
    controller: 'ShowController',
    templateUrl: 'js/views/show.html'
  })
  .when('/spots/new',{
    controller: 'SpotsController',
    templateUrl: 'js/views/create_spot.html'
  })
  .when('/spots/:s_id/show',{
    controller: 'SpotsController',
    templateUrl: 'js/views/show.html'
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
  if (get.cookies("id") != "") {
    console.log("Logged In")
    return true
  } else {
    return false
  }
}

function logout(){
  console.log("logout function")
  $cookies.remove("id")
}

function checkAuthorization(){
  if (get.cookies("id") === $routesParams.u_id){
    return true
  } else {
    return false
  }
}

