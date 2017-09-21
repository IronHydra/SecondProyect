var map;
var service;
var infowindow;

function startMap() {
  var madrid = {
    lat: 40.435264,
    lng: -3.692558
  };
  map = new google.maps.Map(
    document.getElementById('myMap'), {
      zoom: 15,
      center: madrid
    });

  var request = {
    location: madrid,
    radius: '500',
    query: 'museum'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

startMap();
