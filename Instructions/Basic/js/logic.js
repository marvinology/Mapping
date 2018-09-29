// const mapboxToken = "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ";

// perform an API call to get information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);

function createMarkers(response) {


  // initialize an array to hold bike markers
  var bikeMarkers = [];

  // loop through the stations array
  for (var index = 0; index < locations.length; index++) {
    var locations = locations[index];

    // for each station, create a marker and bind a popup with the locations's name
    var cityMarker = L.marker([locations.lat, locations.lon])
      .bindPopup("<h3>" + location.name + "<h3><h3>Capacity: " + location.capacity + "<h3>");

    // add the marker to the bikeMarkers array
    cityMarkers.push(cityMarker);
  }

  // create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(cityMarkers));
//}

function createMap(bikeStations) {

  // create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Bike Stations": bikeStations
  };

  //Create a map object
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [lightmap]
  });


//Function to determine marker size based on magnitude
  function markerSize(magnitude){
    return magnitude * 400;
  }

//for (var i = 0; i < )
});

// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// });
//.addTo(myMap);
