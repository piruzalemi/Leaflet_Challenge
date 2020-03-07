// ----------------------------------------------------------------------
// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
//                                    Alemi Feb 27, 2020
// ---------------------------------------------------------------------
// var myMap = L.map("map", {
//   center: [45.52, -122.67],
//   zoom: 13
// });

// Create an initial map object
// Set the longitude, latitude, and the starting zoom level
//var myMap = L.map("map").setView([45.52, -122.67], 3);

// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  


// ---------------------------------------------------------------------
// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
// ---------------------------------------------------------------------
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// _________________________________________________________________________________
// Create a new marker. Note 2 arguments were passed to L.markere
//     1. An array where the marker should be placed
//     2. An object which is draggable
// Pass in some initial options, and then add it to the map using the addTo method
// This set my First MArker!                   Alemi 02/27/2020
// Note the first marker (Hello There will over write subsequent markers~!)
// _________________________________________________________________________________
// var marker = L.marker([45.52, -122.67], {
// var marker = L.marker([45.52, -74.67], {
//     draggable: true,
//     title: "My First Marker"
//   }).addTo(myMap); 
//   //Binding a pop-up to our marker
//   marker.bindPopup("Hello There!");

  // Define a markerSize function that will give each city a different radius based on its population
function markerSize(population) {
    return population / 40;
  }
  

  // An array containing each city's name, location, and population
  var cities = [
    {
      name: "New York",
      location: [40.7128, -74.0059],
      population: 8550405
    },
    {
      name: "Chicago",
      location: [41.8781, -87.6298],
      population: 2720546
    },
    {
      name: "Houston",
      location: [29.7604, -95.3698],
      population: 2296224
    },
    {
      name: "Los Angeles",
      location: [34.0522, -118.2437],
      population: 3971883
    },
    {
      name: "Omaha",
      location: [41.2524, -95.9980],
      population: 446599
    }
  ];
  
  
  // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
//   for (var i = 0; i < cities.length; i++) {
//     var city = cities[i];
//     L.marker(city.location)
//       .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
//       .addTo(myMap);
//   }
  
  // ??????????????????????????????????????????????????????????
  // Create a new marker
L.marker([45.52, -122.67]).addTo(myMap);

// Create a circle and pass in some initial options
L.circle([45.52, -122.69], {
  color: "green",
  fillColor: "green",
  fillOpacity: 0.75,
  radius: 500
}).addTo(myMap);

// Create a Polygon and pass in some initial options
L.polygon([
  [45.54, -122.68],
  [45.55, -122.68],
  [45.55, -122.66]
], {
  color: "yellow",
  fillColor: "yellow",
  fillOpacity: 0.75
}).addTo(myMap);

// Coordinates for each point to be used in the polyline
var line = [
  [45.51, -122.68],
  [45.50, -122.60],
  [45.48, -122.70],
  [45.54, -122.71]
];

// Create a polyline using the line coordinates and pass in some initial options
L.polyline(line, {
  color: "red"
}).addTo(myMap);

// Create a rectangle and pass in some initial options
L.rectangle([
  [45.55, -122.64],
  [45.54, -122.61]
], {
  color: "black",
  weight: 3,
  stroke: true
}).addTo(myMap);


// Create a red circle over Dallas
L.circle([32.7767, -96.7979], {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.75,
    radius: 20000
  }).addTo(myMap);
  
  // Connect a black line from NYC to Toronto
  var line = [
    [40.7128, -74.0060],
    [43.6532, -79.3832]
  ];
  L.polyline(line, {
    color: "black"
  }).addTo(myMap);
  
  // Create a purple polygon the covers the area in Atlanta, Savannah, Jacksonville and Montgomery
  L.polygon([
    [33.7490, -84.3880],
    [32.0809, -81.0912],
    [30.3322, -81.6557],
    [32.3792, -86.3077]
  ], {
    color: "purple",
    fillColor: "purple",
    fillOpacity: 0.75
  }).addTo(myMap);
  

// Country data
var countries = [
    {
      name: "Brazil",
      location: [-14.2350, -51.9253],
      points: 227
    },
    {
      name: "Germany",
      location: [51.1657, 10.4515],
      points: 218
    },
    {
      name: "Italy",
      location: [41.8719, 12.5675],
      points: 156
    },
    {
      name: "Argentina",
      location: [-38.4161, -63.6167],
      points: 140
    },
    {
      name: "Spain",
      location: [40.4637, -3.7492],
      points: 99
    },
    {
      name: "England",
      location: [52.355, 1.1743],
      points: 98
    },
    {
      name: "France",
      location: [46.2276, 2.2137],
      points: 96
    },
    {
      name: "Netherlands",
      location: [52.1326, 5.2913],
      points: 93
    },
    {
      name: "Uruguay",
      location: [-32.4228, -55.7658],
      points: 72
    },
    {
      name: "Sweden",
      location: [60.1282, 18.6435],
      points: 61
    }
  ];
  

//-----------------------------------------------------------------------
//     Alemi Addition to set circles on the basis of population size (changed to numeric from 800,345,34)
//-----------------------------------------------------------------------

// Loop through the cities array and create one marker for each city object
// for (var i = 0; i < cities.length; i++) {
//     L.circle(cities[i].location, {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: "red",
//       // Setting our circle's radius equal to the output of our markerSize function
//       // This will make our marker's size proportionate to its population
//       radius: markerSize(cities[i].population)
//     }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
//   }
  

  // Define a markerSize function that will give each city a different radius based on its population
  function markerSize2(points) {
    return points ;
  }

// _______________   Alemi Loop thru Countries
// Loop through the cities array and create one marker for each city object
for (var i = 0; i < countries.length; i++) {

        // Conditionals for countries points
        var color = "";
        if (countries[i].points > 200) {
            color = "yellow";
        }
        else if (countries[i].points > 100) {
            color = "blue";
        }
        else if (countries[i].points > 90) {
            color = "green";
        }
        else {
            color = "red";
        }

    L.circle(countries[i].location, {
      fillOpacity: 0.75,
      color: color,
      fillColor: color,
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      radius: markerSize2(countries[i].points) * 1700
    }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
  }

  //   for (var i = 0; i < cities.length; i++) {
//     var city = cities[i];
//     L.marker(city.location)
//       .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
//       .addTo(myMap);
//   }

