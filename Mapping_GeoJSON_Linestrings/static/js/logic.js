// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let day_nav = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create a dark view layer that will be an option for our map.
let night_nav = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer to hold both maps.
let baseMaps = {
  "Day Navigation": day_nav,
  "Night Navigation": night_nav
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [night_nav]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/SDCoulter/Mapping_Earthquakes/main/torontoRoutes.json";

// Create the style for the lines.
let myStyle = {
  color: "#ffffa1",
  lineweight: 2
};

// Grabbing our GeoJSON data from URL.
d3.json(torontoData).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>Airline: " + feature.properties.airline + "<hr />Destination: \
                      " + feature.properties.dst + "</h3>")
    }
  }).addTo(map);
});
