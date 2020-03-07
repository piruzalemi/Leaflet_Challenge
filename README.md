## Leaflet_Challenge
From: Piruz Alemi
Subject: Report on Leaflet – JavaScript
Date: Feb 27th, 2020

### Run Index.html
 	To get results of the following report:
 
See also on Github:

…or create a new repository on the command line
echo "# Leaflet_Challenge" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:piruzalemi/Leaflet_Challenge.git
git push -u origin master
…or push an existing repository from the command line
git remote add origin git@github.com:piruzalemi/Leaflet_Challenge.git
git push -u origin master

## Alemi- Leaflet.js
## Objectives
•	Understand the benefits that visualizing data with maps can provide.
•	Learn the basics of creating maps and plotting data with the Leaflet.js library.
•	Gain an understanding of the GeoJSON format.
•	Understand the concept of layers and layer controls and how we can use them to add interactivity to our maps.
•	Gain a firm grasp of mapping with GeoJSON.
•	Learn about and practice using Leaflet plugins and third-party libraries.
•	Learn how different maps can effectively visualize different datasets.
•	Gain a Leaflet mastery by completing an in-class project.
•	Understand how different types of maps are better for visualizing different datasets.
 
Helpful Links I utilized:
•	Leaflet.js Tutorial
 
https://leafletjs.com/examples/geojson/
•	https://leaflet-extras.github.io/leaflet-providers/preview/
•	https://github.com/timwis/Leaflet-choropleth

While Leaflet provides a choropleth tutorial, that approach requires us to specify exact breakpoints and colors. This plugin uses chroma.js . We just tell it which property in the GeoJSON to use and some idea of the color scale we want.

 

Choropleth plugin for Leaflet (color scale based on value) 

### Some additional helpful links:
•	Leaflet Usage Example
•	Citi Bike Station Information API EndPoint
•	Leaflet Popup Doc
•	Citi Bike Station Status API EndPoint
•	Leaflet Layer Groups Doc
•	Leaflet Extra Markers
•	Leaflet Legend Doc
•	https://github.com/Leaflet/Leaflet.heat
•	https://github.com/Leaflet/Leaflet.heat
•	https://leaflet-extras.github.io/leaflet-providers/preview/
•	Interactive examples of a bunch of different basemaps you can use with Leaflet
Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, I was helping them out with an exciting new project!
The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.


### Interesting Solutions:
•	Had to provide my own API key to bypass following error:

1.	Set my path Options: https://leafletjs.com/reference-1.6.0.html#path
2.	Tested the layers: https://leafletjs.com/reference-1.6.0.html#layer
3.	Locations:  https://leafletjs.com/reference-1.0.3.html#toc
4.	Used the 'Vector Layers' section of the Leaflet documentation for reference.
5.	Refered to the Leaflet docs for Path Options when I was stuck creating vector layers.
6.	Refered to the Leaflet Layers Control Docs
7.	I was successful. I was able to toggle between Street Map and Dark Map base layers, as well as turn earthquakes layers on and off.
See Leaflet Documentation on GeoJSON:
8.	http://leafletjs.com/reference.html#geojson
9.	http://leafletjs.com/examples/geojson/
10.	https://leafletjs.com/reference-1.0.3.html#geojson
11.	
### Before I Began
1.	I created a new repository for this project called leaflet-challenge. Did not add this homework to an existing repository.
2.	Cloned the new repository to my computer.
3.	Inside my local git repository, created a directory for the Leaflet challenge. Used the folder names to correspond to the challenges.
4.	I utilized both html and Javascript that i added to all the necessary files. These were the main files I ran for analysis.
5.	Pushed the above changes to GitHub.
### My Task

### Level 1: Basic Visualization
My first task was to visualize an earthquake data set.

1.	To Get my data set
The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I Visited the USGS GeoJSON Feed page and picked a data set to visualize. When I clicked on a data set, for example 'All Earthquakes from the Past 30 Days', I was given a JSON representation of that data. After prettifying the json data, I used the URL of this JSON to pull in the data for our visualization.
2.	Imported & Visualized the Data
Created a map using Leaflet that plots all of the earthquakes from my data set based on their longitude and latitude.
o	My data markers reflected the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color.
o	Included popups that provided additional information about the earthquake when a marker is clicked.
o	Created a legend that provided a context for my map data.

### In Level 2: More Data (Optional - Advance)

I successfully completed the Advance part. The USGS wanted to plot a second data set on my map to illustrate the relationship between tectonic plates and seismic activity. I needed to pull in a second data set and visualize it along side my original set of data. Data on tectonic plates was found at https://github.com/fraxen/tectonicplates.
In this step I did plot:
•	Plotted a second data set on our map.
•	Added a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.
•	Added layer controls to our map.
 

# Appendix 1

DATA USED:

I used a geoJson data as in PB2002_orogens.json below:
4 different data sets exist on the following github:
For further details see: https://github.com/fraxen/tectonicplates


The second map, consisted of earthquakes in the following format:
See this report on gitHub, in PDF format.
 
From the bike data where we used the original program and adapted it to earthquake data, the data consisted of two parts:
1.	Bike. Info and Bike Stations_Status
2.	Information – which carries the coordinates of Lat & Longitude

On this data set a loop was set on Data.Stations to get each stations’s properties. First the data was read as in:
 
Next there was a loop as in: 
 
The final result was:
See PDF version for JPG report of results. or simply run index.html. Respectfully, Piruz Alemi March 5, 2020
