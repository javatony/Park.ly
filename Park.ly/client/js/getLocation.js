var latitude = 0;
var longitude = 0;
// Gets current location and sets map view
function getLocation(currentLocations){
  navigator.geolocation.getCurrentPosition(function(position){
       latitude = position.coords.latitude;
       longitude = position.coords.longitude;
       console.log (latitude,longitude);
       renderMap(currentLocations);
  });
}

