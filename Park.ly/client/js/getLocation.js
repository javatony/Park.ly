var latitude = 0;
var longitude = 0;

function getLocation(){
  navigator.geolocation.getCurrentPosition(function(position){

       latitude = position.coords.latitude;
       longitude = position.coords.longitude;

       console.log (latitude,longitude);
       renderMap();
});
}

