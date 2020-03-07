// Store our API endpoint inside queryUrl
// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
//  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

      // --------------------------------------  
      // Define streetmap and darkmap layers   as the base maps.... no! as tileLayer.....
      // ---------------------------------------
      var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Alemi Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxzoom: 15,
       
        id: "mapbox.streets",
        accessToken: API_KEY
      });
    
    
    
      var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxzoom: 15,
        id: "mapbox.dark",
        accessToken: API_KEY
      });


// -----------------------------------------------------
// Initialize all of the LayerGroups we'll be using
// ----------------------------------------------------
var layers = {
  poly: new L.LayerGroup(),
  earthquakes: new L.LayerGroup(),

  COMING_SOON: new L.LayerGroup(),
  EMPTY: new L.LayerGroup(),
  LOW: new L.LayerGroup(),
  NORMAL: new L.LayerGroup(),
  OUT_OF_ORDER: new L.LayerGroup()
};

// ----------------------------------------------------------------------------------------------------------------
//                                      Create the map with our layers
// This solely is an initialization phase where the map is defined - it is blank until it is loaded by a command like
// addTo(map)                                                   Alemi March 2, 2020
// ----------------------------------------------------------------------------------------------------------------
var map = L.map("map", {
  center: [40.73, -74.0059],
  zoom: 2,
  layers: [
    layers.poly,
    layers.earthquakes,

    layers.COMING_SOON,
    layers.EMPTY,
    layers.LOW,
    layers.NORMAL,
    layers.OUT_OF_ORDER
  ]
});

// Add our 'lightmap' tile layer to the map, in this case streetmap
streetmap.addTo(map);

// -----------------------------------------------------------------------------------------------
//                 Create an overlays object to add to the layer control
// -----------------------------------------------------------------------------------------------
// var overlays = {
//   "Poly Soon": layers.poly,
//   "Earhquake Soon": layers.earthquakes
//   //"PiruzEarthquakes": layers.earthquakes
// };

// Create an overlays object to add to the layer control
var overlays = {
  "Coming Soon": layers.COMING_SOON,
  "Empty Stations": layers.EMPTY,
  "Low Stations": layers.LOW,
  "Healthy Stations": layers.NORMAL,
  "Out of Order": layers.OUT_OF_ORDER
};

// Create a control for our layers, add our overlay layers to it
// L.control.layers(null, overlays).addTo(map);

// -------------------------------------------------------------------------------------------------
//                 Create a control for our layers, add our overlay layers to it
// -------------------------------------------------------------------------------------------------
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

var info2 = L.control({
  position: "bottomleft"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};

info2.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};

// Add the info legend to the map
info.addTo(map);
//info2.addTo(map);

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
    //icon: "fas fa-democrat",
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
  //NORMAL: L.ExtraMarkers.icon({
    NORMAL: L.icon({
    //icon: "ion-android-bicycle",
    iconUrl: "piruz.jpg",
    iconSize:     [38, 34], // size of the icon
    iconColor: "white",
    markerColor: "blue",
    shape: "circle"
  })
};
//  ------------------------------------------------------------------------------------------------
//  This section reads the Json output of AlemiMerge2 program
//  It constitutes further advance work, where I capture the polling data of presidential candidates
//  in 2020 parallel with earthquake data! Both can be displayed on the same map
//  For further advance work see Project2_Challenge where i finalize this section
//                                                    Alemi Matrch 5 2020
// ----------------------------------------------------------------------------------------------

console.log("before.............")

d3.json("data_candidates_file.json", function(statusRes2) {
  var stationStatus2 = statusRes2[0].state;
  console.log(stationStatus2)
});

console.log("After.............")


// Perform an API call to the Citi Bike Station Information endpoint
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", function(infoRes) {

  // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
  d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json", function(statusRes) {
    var updatedAt = infoRes.last_updated;
    var stationStatus = statusRes.data.stations;
    var stationInfo = infoRes.data.stations;

    console.log("updatedAt:",updatedAt)
    console.log("stationStatus", stationStatus)
    console.log("stationInfo:", stationInfo)

  // Create an object to keep of the number of markers in each layer
    var candidateCount = {
      Sanders: 0,
      Biden: 0,
      Bloomberg: 0,
      Trump: 0,
      Other: 0
    };

  // Create an object to keep of the number of markers in each layer
    var stationCount = {
        COMING_SOON: 0,
        EMPTY: 0,
        LOW: 0,
        NORMAL: 0,
        OUT_OF_ORDER: 0
      };
    
    // --------------------------------------------------------------------------
    // Initialize a stationStatusCode, which will be used as a key to access the 
    // appropriate layers, icons, and station  for layer group
    // -------------------------------------------------------------------------
    var stationStatusCode;

    // Loop through the stations (they're the same size and have partially matching data)
    for (var i = 0; i < stationInfo.length; i++) {

      // Create a new station object with properties of both station objects
      var station = Object.assign({}, stationInfo[i], stationStatus[i]);
      // If a station is listed but not installed, it's coming soon
      if (!station.is_installed) {
        stationStatusCode = "COMING_SOON";
      }
      // If a station has no bikes available, it's empty
      else if (!station.num_bikes_available) {
        stationStatusCode = "EMPTY";
      }
      // If a station is installed but isn't renting, it's out of order
      else if (station.is_installed && !station.is_renting) {
        stationStatusCode = "OUT_OF_ORDER";
      }
      // If a station has less than 5 bikes, it's status is low
      else if (station.num_bikes_available < 5) {
        stationStatusCode = "LOW";
      }
      // Otherwise the station is normal
      else {
        stationStatusCode = "NORMAL";
      }

      // Update the station count
      stationCount[stationStatusCode]++;

      // Create a new marker with the appropriate icon and coordinates
      // Note: This newMArker applies to A L L markers, be it bicycles, or earthquakes
      //                                                Alemi March 5 2020
      // -----------------------------------------------------------------------------
      var newMarker = L.marker([station.lat, station.lon], {
        icon: icons[stationStatusCode]
      });
      // ------------------------------------------------------------------------------------  
      //                  Add the new marker to the appropriate layer
      // ------------------------------------------------------------------------------------
      newMarker.addTo(layers[stationStatusCode]);
      

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
    }

    // Call the updateLegend function, which will... update the legend!
    updateLegend(updatedAt, stationCount, earthCount);

// end of the two reads + 3 reads

  });
});

// --------------------------------------------------------------------------------
// Update the legend's innerHTML with the last updated time and station count
// --------------------------------------------------------------------------------
function updateLegend(time, stationCount, earthCount) {
  document.querySelector(".legend").innerHTML = [
    "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
    "<p class='out-of-order'>Out: " + stationCount.OUT_OF_ORDER + "</p>",
    "<p class='coming-soon'>Soon: " + stationCount.COMING_SOON + "</p>",
    "<p class='empty'>Empty: " + stationCount.EMPTY + "</p>",
    "<p class='low'>Low: " + stationCount.LOW + "</p>",
    "<p class='healthy'>Normal: " + stationCount.NORMAL + "</p>",

    "<p class='low'>---------------------- " + " " + "</p>",
    "<p class='coming-soon'>Major earthquakes: " + earthCount.COMING_SOON + "</p>",
    "<p class='low'>Low mag earthquakes: " + earthCount.LOW + "</p>",
    "<p class='healthy'>Midium size earthQuakes: " + earthCount.NORMAL + "</p>"
  ].join("");
}


    


// --------------------------------------------------------------------------------------------------
//              Perform a GET request to the query URL for earthquakes
// --------------------------------------------------------------------------------------------------
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  // var magnitude = data.features[0].properties.mag
  //   console.log(" * * * * * * * * * * * * * * * * * * *")
  //   console.log("magnitude:",magnitude)
  //   console.log(data.features[0])
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
var earthCount = {
  COMING_SOON: 0,
  EMPTY: 0,
  LOW: 0,
  NORMAL: 0
  };

//  ==================================================================================
//  Note: Data.Features is passed  as a parameter and becomes eqData (i.e. Earthquake Data)
//                                                            Alemi March 6, 2020
//  ================================================================================
function createFeatures(eqData) {

  var magnitude = eqData[0].properties.mag

  console.log("magnitude:",magnitude)
  console.log(eqData[0])

   // Create an object to keep of the number of markers in each layer
   // Note This counter was moved out of the local function to make it global and accessible
   // to other functions
   //                                            Alemi March 5, 2020
  //  var earthCount = {
  //   COMING_SOON: 0,
  //   EMPTY: 0,
  //   LOW: 0,
  //   NORMAL: 0
  //   };

    // --------------------------------------------------------------------------
    // Initialize a eqStatusCode, which will be used as a key to access the 
    // appropriate layers, icons, and eachEq count for layer group
    // -------------------------------------------------------------------------
    var earthStatusCode;

    // Loop through the earths (they're the same size and have partially matching data)
    for (var i = 0; i < eqData.length; i++) {

      
    // -------------------------------------------------------------------------
    // Test the magintude of the earth quake
    // ------------------------------------------------------------------------

      console.log(" * * * * * * * * * * * * * * * * * * *")
      var eachEq = eqData[i];
      // console.log(eachEq.properties)
      // If eachEq is coming soon
      if (!eachEq.properties.mag > 7) {
        console.log(eachEq.properties.mag)
        earthStatusCode = "COMING_SOON";
      }
      // If eachEq has no magnitude available, it's empty
      else if (!eachEq.properties.mag) {
        earthStatusCode = "EMPTY";
      }
      // If eachEq has less is less than 1.5, it's status is low
      else if (eachEq.properties.mag > 6) {
        earthStatusCode = "LOW";
      }
      // Otherwise the eachEq is normal
      else {
        earthStatusCode = "NORMAL";
      }
      // -----------------------------------------------------------------------------------
      // Update the each earth quake count, by the status of its earthquake magnitude ranges
      // The latter counts are then passed to the legend of the earthquake map
      // -----------------------------------------------------------------------------------
      earthCount[earthStatusCode]++;
    }
    // -------------------------------------------------------------------------------------

  //console.log("createFeatures of earthquake");
  //var magnitude = .properties.mag
  //console.log("magnitude", magnitude)

  // ------------------------------------------------------------------------------------------  
  // A function within a function:  
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  //                                                       Alemi feb 29, 2020
  // ------------------------------------------------------------------------------------------------ 
  // Seems a default marker goes with bindPopup
  
  function onEachFeature1(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

 
  // -------------------------------------------------------------------------------------------------
  //    * * * * * *                C R E A T E   A  L A Y E R   FROM GEOJSON DATA!       * * * * * * *
  // -------------------------------------------------------------------------------------------------
  //    Create a GeoJSON layer containing the features array on the eqData object
  //    Run the onEachFeature1 function once for each piece of data in the array
  //    onEachFeature is Leaflet component.                 Piruz March 5th, 2020
  // --------------------------------------------------------------------------------------------------
  var earthquakes = L.geoJSON(eqData, {
    onEachFeature: onEachFeature1
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

      function onEachFeature2(feature, layer) {
        layer.bindPopup("<h3>" + feature.geometry.coordinates +
          "</h3><hr><p>" + feature.properties.Name + "</p>");
         // console.log("bind poly coordinates3?")
      }
         // console.log("bind poly coordinates4?")
      // --------------------------------------------------------------------------------------------------
      //    Create a GeoJSON layer containing the features array on the polyData object
      //    Run the onEachFeature function once for each piece of data in the array
      //    onEachFeature is a leaflet... Piruz
      // --------------------------------------------------------------------------------------------------
      var poly = L.geoJSON(polyData, {
        onEachFeature: onEachFeature2
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
        maxzoom: 15,
       
        id: "mapbox.streets",
        accessToken: API_KEY
      });
    
    
    
      var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxzoom: 15,
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
    //PiruzPolygons: poly                     
  };

  // -------------------------------------------------------------------
  //                1. Create a layer control
  //                2. Pass in our baseMaps and overlayMaps
  //                3. Add the layer control to the map
  // Note: We have multiple overlay maps, with and without switch boxes
  // -------------------------------------------------------------------
  console.log("Wow baseMaps + overlayMaps?")
  console.log(earthquakes)
  //   This also adds the controls options for various layers
  // L.control.layers(null, overlays).addTo(map);
  // L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);
  L.control.layers(null, overlayMaps, {collapsed: false}).addTo(map);
  //L.control.layers(null, overlays, {collapsed: false}).addTo(map);

}

