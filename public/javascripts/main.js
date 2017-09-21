
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
}

startMap();
