var map;
var infoWindow;
var service;

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
  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  map.addListener("idle", performSearch);
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    keyword: 'museums'
  }
  service.radarSearch(request, callback)
}

function callback(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    addMarker(result);
  }
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(10, 17)
    }
  });

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      infoWindow.setContent(result.name);
      infoWindow.open(map, marker);
    });
  });
}
