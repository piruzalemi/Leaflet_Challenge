// Store our API endpoint inside queryUrl
// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
//  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

      // --------------------------------------  
      // Define streetmap and darkmap layers   as the base maps.... no! as tileLayer.....
      // ---------------------------------------
      var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Alemi Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
       
        id: "mapbox.streets",
        accessToken: API_KEY
      });
    
    
    
      var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
      });


// -----------------------------------------------------
// Initialize all of the LayerGroups we'll be using
// ----------------------------------------------------
var layers = {
  poly: new L.LayerGroup(),
  earthquakes: new L.LayerGroup()
};

// ----------------------------------------------------------------------------------------------------------------
//                                      Create the map with our layers
// This solely an initialization phase where the map is defined - it is blank until it is loaded by a command like
// addTo(map)                                                   Alemi March 2, 2020
// ----------------------------------------------------------------------------------------------------------------
var map = L.map("map", {
  center: [40.73, -74.0059],
  zoom: 9,
  layers: [
    layers.poly,
    layers.earthquakes
  ]
});

// Add our 'lightmap' tile layer to the map
streetmap.addTo(map);

// -----------------------------------------------------------------------------------------------
//                 Create an overlays object to add to the layer control
// -----------------------------------------------------------------------------------------------
var overlays = {
  "Poly Soon": layers.poly,
  "Earhquake Soon": layers.earthquakes,
  //PiruzEarthquakes: earthquakes
};

// -------------------------------------------------------------------------------------------------
//                 Create a control for our layers, add our overlay layers to it
// -------------------------------------------------------------------------------------------------
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };




// --------------------------------------------------------------------------------------------------
//              Perform a GET request to the query URL for earthquakes
// --------------------------------------------------------------------------------------------------
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

console.log("Reading url2")

//     R E A D POLY DATA  a layer to be added 

var queryUrl2 = "data_PB2002_orogens.json";
d3.json(queryUrl2, function(data2) {
  // Once we get a response, send the data.features object to the createFeatures function
  //      C O M E N T    O U T     F O R  N O W
  // createFeatures2(data2.features);
});


//  ==================================================================================
function createFeatures(earthquakeData) {

  console.log("createFeatures of earthquake");

  // ------------------------------------------------------------------------------------------  
  // A function within a function:  
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  //                                                       Alemi feb 29, 2020
  // ------------------------------------------------------------------------------------------------  
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

 
  // -------------------------------------------------------------------------------------------------
  //    * * * * * *                C R E A T E   A  L A Y E R   FROM GEOJSON DATA!       * * * * * * *
  // -------------------------------------------------------------------------------------------------
  //    Create a GeoJSON layer containing the features array on the earthquakeData object
  //    Run the onEachFeature function once for each piece of data in the array
  //    onEachFeature is a leaflet... Piruz
  // --------------------------------------------------------------------------------------------------
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });
  // --------------------------------------------------------------------------------------------------
  //                        Sending our earthquakes layer to the createMap function
  // -------------------------------------------------------------------------------------------------
  createMap(earthquakes);
  console.log("earthquakes:........:",earthquakes)
}


//----------------------------------------------------------------------------------------------------
//                                 P O L Y         S E C T I O N
//----------------------------------------------------------------------------------------------------
    function createFeatures2(polyData) {
      console.log("..............Wow  entered Poly Section...................................................")
      console.log("create polyData features2....?")

      // ------------------------------------------------------------------------------------------------  
      // A function within a function!  
      // Define a function we want to run once for each feature in the features array
      // Give each feature a popup describing the place and time of the earthquake
      //                                                       Alemi feb 29, 2020
      // ------------------------------------------------------------------------------------------------ 

      function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.geometry.coordinates +
          "</h3><hr><p>" + " " + "</p>");
          console.log("bind poly coordinates3?")
      }
          console.log("bind poly coordinates4?")
      // --------------------------------------------------------------------------------------------------
      //    Create a GeoJSON layer containing the features array on the polyData object
      //    Run the onEachFeature function once for each piece of data in the array
      //    onEachFeature is a leaflet... Piruz
      // --------------------------------------------------------------------------------------------------
      var poly = L.geoJSON(polyData, {
        onEachFeature: onEachFeature
      });

      // --------------------------------------------------------------------------------------------------
      //                        Sending our earthquakes layer to the createMap function
      // -------------------------------------------------------------------------------------------------
      createMap2(poly);
    }

  
    function createMap2(poly) {

      console.log("entered createMap2(poly)")
  
      // --------------------------------------  
      // Define streetmap and darkmap layers   as the base maps.... no! as tileLayer.....
      // ---------------------------------------
      var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Alemi Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
       
        id: "mapbox.streets",
        accessToken: API_KEY
      });
    
    
    
      var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
      });
    
      // --------------------------------------------------
      // Define a baseMaps object to hold our base layers
      // --------------------------------------------------
      // var baseMaps = {
      //   "Piruz Street Map2": streetmap,
      //   "Piruz Dark Map2...": poly
      // };
    
      // --------------------------------------------------
      // Create overlay object to hold our overlay layer
      //  Earth
      // -------------------------------------------------
      // var overlayMaps = {
      //   PiruzEarthquakes: earthquakes,
      //   // PiruzPolygons: poly
      // };
    
      // ----------------------------------------------------------------------------------
      // Create our map, giving it the streetmap and earthquakes layers to display on load
      // ---------------------------------------------------------------------------------
      // var myMap = L.map("map", {
      //   center: [
      //     37.09, -95.71
      //   ],
      //   zoom: 5,
      //   //layers: [streetmap, earthquakes]
      //   layers: [streetmap, poly]
      //   });
      
    }

function createMap(earthquakes) {


   console.log("entered function createMap(earthquake)")
  // --------------------------------------  
  // Define streetmap and darkmap layers   as the base maps.... no! as tileLayer.....
  // ---------------------------------------
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Alemi Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  //    ????????????????????????????
  // var baseMaps = {
  //   "Piruz Street Map": streetmap,
  //   "Piruz Dark Map": darkmap
  // };

  // --------------------------------------------------
  // Create overlay object to hold our overlay layer
  // -------------------------------------------------
  var overlayMaps = {
    PiruzEarthquakes: earthquakes,
    // "Piruz Dark Map2>>>": darkmap
    // PiruzPolygons: poly                     
  };

  // ----------------------------------------------------------------------------------
  // Create our map, giving it the streetmap and earthquakes layers to display on load
  // ---------------------------------------------------------------------------------
  // var myMap = L.map("map", {
  //   center: [
  //     37.09, -95.71
  //   ],
  //   zoom: 5,
  //   layers: [streetmap, earthquakes]
  // });

  // -------------------------------------------------------------------
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  // Can we have multiple overlay maps, without a switch?
  // -------------------------------------------------------------------
  console.log("Wow baseMaps + overlayMaps?")
  console.log(earthquakes)
  //   This also adds the controls options for various layers
  // L.control.layers(null, overlays).addTo(map);
  // L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);
  L.control.layers(null, overlayMaps, {collapsed: false}).addTo(map);



}
