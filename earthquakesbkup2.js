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
  zoom: 3,
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
  "Earhquake Soon": layers.earthquakes
  //"PiruzEarthquakes": layers.earthquakes
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
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  COMING_SOON: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  EMPTY: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  OUT_OF_ORDER: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  LOW: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  NORMAL: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  })
};

// Perform an API call to the Citi Bike Station Information endpoint
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", function(infoRes) {

  // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
  d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json", function(statusRes) {
    var updatedAt = infoRes.last_updated;
    var stationStatus = statusRes.data.stations;
    var stationInfo = infoRes.data.stations;

    console.log("updatedAt:",updatedAt)
    console.log("stationStatus", stationStatus)
  })})

// --------------------------------------------------------------------------------------------------
//              Perform a GET request to the query URL for earthquakes
// --------------------------------------------------------------------------------------------------
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

console.log("Reading url2")

// ---------------------------------------------
//     R E A D POLY DATA  a layer to be added 

var queryUrl2 = "data_PB2002_orogens.json";
d3.json(queryUrl2, function(data2) {
  // Once we get a response, send the data2.features object to the createFeatures2 function
  createFeatures2(data2.features);
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
      
      var overlayMaps = {
        "Poly Data": poly,
        // "Piruz Dark Map2>>>": darkmap
        // PiruzPolygons: poly                     
      };
      L.control.layers(null, overlayMaps, {collapsed: false}).addTo(map);
      // --------------------------------------  
      // Define streetmap and darkmap layers 
      // ---------------------------------------
      var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Alemi Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 9,
       
        id: "mapbox.streets",
        accessToken: API_KEY
      });
    
    
    
      var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 9,
        id: "mapbox.dark",
        accessToken: API_KEY
      });      
    }

function createMap(earthquakes) {

   console.log("entered function createMap(earthquake)")
  // --------------------------------------------------
  // Create overlay object to hold our overlay layer
  // -------------------------------------------------
  var overlayMaps = {
    PiruzEarthquakes: earthquakes,
    // "Piruz Dark Map2>>>": darkmap
    // PiruzPolygons: poly                     
  };

  // -------------------------------------------------------------------
  //                1. Create a layer control
  //                2. Pass in our baseMaps and overlayMaps
  //                3. Add the layer control to the map
  // Can we have multiple overlay maps, without a switch?
  // -------------------------------------------------------------------
  console.log("Wow baseMaps + overlayMaps?")
  console.log(earthquakes)
  //   This also adds the controls options for various layers
  // L.control.layers(null, overlays).addTo(map);
  // L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);
  L.control.layers(null, overlayMaps, {collapsed: false}).addTo(map);
  //L.control.layers(null, overlays, {collapsed: false}).addTo(map);



}

