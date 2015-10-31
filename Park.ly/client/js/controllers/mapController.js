app.controller('MapController', ['$scope', '$routeParams', function($scope, movies, $routeParams) {

    renderMap();

    $("#myLocation").on('click', function(){

    map.remove();

    $('#mapStarter').append('<div id="map"></div>');

    getLocation();

  });

}]);
