// Since featureLayer is an asynchronous method, we use the `.on('ready'`
// call to only use its marker data once we know it is actually loaded.
function renderMap(responseCoords, test){
  L.mapbox.accessToken = 'pk.eyJ1IjoidG9ueXRhbmciLCJhIjoiY2lnY29vYzAwNDV6bnV4a212dmJvaXB2biJ9.q3arVXHBYBTZ_R2PH2vMjA';

  //Devbootcamp SF
  var devLat = 37.769425;
  var devLong = -122.4884078;

  var renderMapHelper = function(lat, lng, responseCoords, locationTag){
    // var allMaps = ['mapbox.streets', 'mapbox.light', 'mapbox.comic', 'mapbox.outdoors', 'mapbox.pencil', 'mapbox.pirates', 'mapbox.emerald', 'mapbox.high-contrast']
    // var randMap = allMaps[Math.floor(Math.random()*allMaps.length)];
    var map = L.mapbox.map('map', 'mapbox.emerald').setView([lat, lng], 15);
    var marker = L.marker(new L.LatLng(lat, lng),{
      draggable:false
    });

    marker.bindPopup( locationTag ).openPopup();
    marker.addTo(map);
    var myLayer = L.mapbox.featureLayer().addTo(map);
    myLayer.on('layeradd', function(e) {
      var marker = e.layer,
      feature = marker.feature;

      // Create custom popup content. Chande properties.description to add whatever you like
      var popupContent =  '<a target="_blank" class="popup" href="' + '#/' + 'spots/' + feature.id + '/show' + '">' +
                            '<img src="' + feature.properties.image + '" />' + '$' + feature.price + ' ' +
                            feature.properties.description +
                          '</a>';

      // http://leafletjs.com/reference.html#popup
      marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 276,
        maxWidth: 276
      });
    });

    myLayer.setGeoJSON( responseCoords || geojson );
  }

  //Controller of what data to use on map
  if(latitude != 0){
    renderMapHelper(latitude, longitude, responseCoords, "Your Current Location");
    latitude = 0;
  }else if(responseCoords)  {
    renderMapHelper(newLat, newLng, responseCoords, "Location");
  }else { //First reach the site
    renderMapHelper(devLat, devLong, responseCoords, "Headquarter SF");
  }

  console.log("Rendering Map...");
}

