// const mapboxToken = "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ";

// perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function (data){
//   var locations = data.features.map(d => [geometry.coordinates[1], d.geometry.coordinates[0]]);
// });
//
function createMarkers(mag) {
  return mag * 20000;
}

function markerColor(magnitude) {
   if (magnitude > 5) {
       return 'darkred'
   } else if (magnitude > 4) {
       return 'red'
   } else if (magnitude > 3) {
       return 'orange'
   } else if (magnitude > 2) {
       return 'yellow'
   } else if (magnitude > 1) {
       return 'teal'
   } else {
       return 'lightgreen'
   }
};

//   var station = stations[index];
//
//   // for each station, create a marker and bind a popup with the station's name
//   var bikeMarker = L.marker([station.lat, station.lon])
//     .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "<h3>");
//
//   // add the marker to the bikeMarkers array
//   bikeMarkers.push(bikeMarker);
// }

// create a layer group made from the bike markers array, pass it into the createMap function
//createMap(L.layerGroup(bikeMarkers));
// console.log(cityMarkers);

// perform an API call to get information.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function (data) {
  var places = data.features.map(d => d.properties.place);
  var mags = data.features.map(d => d.properties.mag);
  var locations = data.features.map(d => [d.geometry.coordinates[1], d.geometry.coordinates[0]]);

 // initialize an array to hold markers
  var locationMarkers = [];

  // Loop through locations and create markers dependent on magnitude intensity
  for (var i = 0; i < locations.length; i++) {
    locationMarkers.push(
      L.circle(locations[i], {
        fillOpacity: .80,
        color: markerColor(mags[i]),
        fillColor: markerColor(mags[i]),
        radius: createMarkers(mags[i])
      })
    )
  };

  //create the tile layer that will be the background of our map
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

  // Create a layer for cities
  var locations = L.layerGroup(locationMarkers);

  // Create the map object with options
  var map = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4,
    layers: [lightmap, locations]
  });
});

// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// });
//.addTo(myMap);
