
function renderMap(responseCoords){
  L.mapbox.accessToken = 'pk.eyJ1IjoidG9ueXRhbmciLCJhIjoiY2lnY29vYzAwNDV6bnV4a212dmJvaXB2biJ9.q3arVXHBYBTZ_R2PH2vMjA';


  var devLat = 37.784619;
  var devLong = -122.397236;

//THIS NEEDS CHECKING
  if(responseCoords){
    var map = L.mapbox.map('map', 'mapbox.streets')
        .setView(["**lat**", "**lng**"], 15);


      var marker = L.marker(new L.LatLng("**lat**", "**lng**"),{
      draggable:false
      });

      marker.bindPopup('Location').openPopup();
      marker.addTo(map);

    myLayer.setGeoJSON(geojson);

  }else if(latitude != 0){
      var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([latitude, longitude], 15);
        // .featureLayer.setGeoJSON(geojson);

      var marker = L.marker(new L.LatLng(latitude, longitude),{
      draggable:false
      });

      marker.bindPopup('Current user').openPopup();
      marker.addTo(map);
    myLayer.setGeoJSON(geojson);

    }else{
      var map = L.mapbox.map('map', 'mapbox.streets')
      .setView([devLat, devLong], 15);
      // .featureLayer.setGeoJSON(geojson);

      var marker = L.marker(new L.LatLng(devLat, devLong),{
        draggable:false
      });
      marker.bindPopup('Head Quarters').openPopup();
      marker.addTo(map);
  }


  var myLayer = L.mapbox.featureLayer().addTo(map);

  myLayer.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    // Create custom popup content. Chande properties.description to add whatever you like
    var popupContent =  '<a target="_blank" class="popup" href="' + feature.properties.url + '">' +
                            '<img src="' + feature.properties.image + '" />' +
                            feature.properties.description +
                        '</a>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 340
    });
  });

    myLayer.setGeoJSON(geojson);
  // ********************************************
  // Upon ajaxing locations from database, it can be added to the map from success response sending back json.
  // ********************************************
  //   $.ajax({
  //   headers: {
  //     'Accept': 'application/vnd.github.v3.raw'
  //   },
  //   xhrFields: {
  //     withCredentials: false
  //   },
  //   dataType: 'json',
  //   url: url,
  //   success: function(geojson) {
  //       // On success add fetched data to the map.
  //       L.mapbox.featureLayer(geojson).addTo(map);
  //   }
  // });

//**********Coordinates to Address **********

// $.getJSON("https://api.mapbox.com/geocoding/v5/mapbox.places/"+ longitude +","+ latitude + ".json?access_token=pk.eyJ1IjoidG9ueXRhbmciLCJhIjoiY2lnY29vYzAwNDV6bnV4a212dmJvaXB2biJ9.q3arVXHBYBTZ_R2PH2vMjA", function(result){console.log(result.features[0].place_name)});
//*****************Address to Coordinates*********************************

//************Jquery for search button on map **********************
// $("#address").submit(function(event){
//   event.preventDefault();

// var startDate = $('#startDate').val();
// var endDate = $('#endDate').val();
//   // map.remove();

//  var rawAddress =  $("#addressField").val();
//   var finalAddress = rawAddress.split(' ').join('+');

//   $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + finalAddress + "&key=AIzaSyCi72FpZOhti2We62SYVS8NQ9pQPO9Wk1E", function(results){
//   var newLat = results.results[0].geometry.location.lat;
//   var newLng = results.results[0].geometry.location.lng;
//     console.log(results);
//     console.log(results.results[0].geometry.location.lat);
//     console.log(results.results[0].geometry.location.lng);


//     // $('#mapStarter').append('<div id="map"></div>');
//     // renderMap();

//     // var map = L.mapbox.map('map', 'mapbox.streets')
//     //     .setView([newLat, newLng], 10);
//         // .featureLayer.setGeoJSON(geojson);

//     var marker = L.marker(new L.LatLng(newLat, newLng),{
//       draggable:false
//     });

//     marker.bindPopup('Location').openPopup();
//     marker.addTo(map);

//   });
// });


//**************************************************

  console.log("Rendering Map...");
}


