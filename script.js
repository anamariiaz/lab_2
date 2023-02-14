//provide access token to Mapbox API 
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbWFyaWlheiIsImEiOiJjbGRtMTR5YmUwMjBqM3VrZDU0N2RmeTVuIn0.TtYMegWHD_9XSk_jO1jZFg'; 

//define maximum and minimum scroll bounds for the maps
const maxBounds = [
    [-79.8, 43.4], //SW coords
    [-78.8, 44] //NE coords
];

//define a constant variable "map" and assign it to a map created with the Mapbox API 
const map = new mapboxgl.Map({
    container: 'map1', //ID for div where map will be embedded in HTML file
    style: 'mapbox://styles/anamariiaz/cle0brfn8003l01lgvvukhmmb', //link to style URL
    center: [-79.3, 43.765], //starting position [longitude, latitude]
    zoom: 9.2, //starting zoom
    bearing: -17.7, //angle rotation of map
	maxBounds: maxBounds //maximum and minimum scroll bounds
});

//specify events triggered by the loading of the "map" variable
map.on('load', () => {

    //add a geojson file source "bikeways" for Toronto bikeways
    map.addSource('bikeways', {
        type: 'geojson',
        data: 'https://anamariiaz.github.io/data/bikeways.geojson'
    });

    //add and style a layer of lines "bike" from the defined "bikeways" source
    map.addLayer({
        'id': 'bike',
        'type': 'line',
        'source': 'bikeways',
        'paint': {
            'line-width': 1,
            'line-color': '#B42222', 
            'line-opacity': 0.5 //modify opacity to allow both terrain contours from the basemap and symbols placed atop the lines to be visible
        }
    });

    //add a geojson file source "universities" for Toronto universities
    map.addSource('universities', {
        type: 'geojson',
        data: 'https://anamariiaz.github.io/data/universities.geojson'
    });

    //add and style a layer of symbols "university" from the defined "universities" source
    map.addLayer({
        'id': 'university',
        'type': 'symbol',
        'source': 'universities',
        'layout': {
            'text-field': ['get', 'name'], //retrieve the value of the "name" property for the points in the geojson file and assign to their symbols' text labels
            'text-variable-anchor': ['bottom'], //specify position of labels relative to the points' coordinates
            'text-radial-offset': 0.5, //specify offset distance of labels from anchor
            'text-font': ["Open Sans Condensed Bold"],
            'text-justify': 'auto' //align labels to anchor position
        },
        'paint':{'text-color': "#6a3b01"}
    });

});

//define a variable "universities" and assign it to the geojson file for Toronto universities
//note that this variable is created (despite having the data source linked in the above map) in order to allow parsing through the geojson file such that assignment of custom markers to the points' coordinates is possible
var universities = {"type":"FeatureCollection",
"features":[
    {"type":"Feature",
    "properties":{"name":"University of Toronto St. George"},
    "geometry":{"coordinates":[-79.3957439931978,43.66364311268359],"type":"Point"}},
    {"type":"Feature",
    "properties":{"name":"OCAD University"},
    "geometry":{"coordinates":[-79.3922680801583,43.65269222888071],"type":"Point"}},
    {"type":"Feature",
    "properties":{"name":"Toronto Metropolitan University"},
    "geometry":{"coordinates":[-79.37928815691426,43.65876949899979],"type":"Point"}},
    {"type":"Feature",
    "properties":{"name":"University of Toronto Scarborough"},
    "geometry":{"coordinates":[-79.18990437628814,43.7898811868142],"type":"Point"}},
    {"type":"Feature",
    "properties":{"name":"York University"},
    "geometry":{"coordinates":[-79.5036743187294,43.77400595798042],"type":"Point"}}
]}

//loop through each feature in the defined "universities" geojson variable
for (const feature of universities.features) {

    //create HTML element for each feature and assign to class "marker"
    const el = document.createElement('div');
    el.className = 'marker';
    
    //create a custom marker for each feature (with style indicated by the "marker" class and location indicated by each feature's point coordinates) and add to the "map" variable
    new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
    
}

//define a constant variable "map2" and assign it to a map created with the Mapbox API
const map2 = new mapboxgl.Map({
    container: 'map2', //ID for div where map will be embedded in HTML file
    style: 'mapbox://styles/anamariiaz/cle06i5jz003p01qopxzabjci', //link to style URL
    center: [-79.3, 43.765], //starting position [longitude, latitude]
    zoom: 9.2, //starting zoom
    bearing: -17.7, //angle rotation of map
	maxBounds: maxBounds //maximum and minimum scroll bounds
});

//specify events triggered by the loading of the "map2" variable
map2.on('load', () => {

    //add a geojson file source "subway routes" for Toronto subway routes
    map2.addSource('subway routes', {
        type: 'geojson',
        data: 'https://anamariiaz.github.io/data/subway_routes.geojson'
    });

    //add and style a layer of lines "subway" from the defined "subway routes" source
    map2.addLayer({
        'id': 'subway',
        'type': 'line',
        'source': 'subway routes',
        'paint': {
            'line-color': [
                'match', ['get','RID'], //retrieve the value of the "RID" property for the lines in the geojson file (specifying the TTC subway line numbers)
                1, '#FFDF00', //specify colors of the lines according to the value of their "RID" property
                2, 'green',
                3,'blue',
                4, 'purple',
                'white'
              ],
              'line-width': 3,
              'line-opacity': 0.5 //modify opacity to allow both transit labels/icons from the basemap and symbols placed atop the lines to be visible
        }
    });

    //add a geojson file source "universities" for Toronto universities
    map2.addSource('universities', {
        type: 'geojson',
        data: 'https://anamariiaz.github.io/data/universities.geojson'
    });

    //add and style a layer of symbols "university" from the defined "universities" source
    map2.addLayer({
        'id': 'university',
        'type': 'symbol',
        'source': 'universities',
        'layout': {
            'text-field': ['get', 'name'], //retrieve the value of the "name" property for the points in the geojson file and assign to their symbols' text labels
            'text-variable-anchor': ['bottom'], //specify position of labels relative to the points' coordinates
            'text-radial-offset': 0.5, //specify offset distance of labels from anchor
            'text-font': ["Open Sans Regular"],
            'text-justify': 'auto' //align labels to anchor position
        },
        'paint':{'text-color': "#40066f"}
    });

});

//loop through each feature in the defined "universities" geojson variable
for (const feature of universities.features) {

    //create HTML element for each feature and assign to class "marker"
    const el = document.createElement('div');
    el.className = 'marker';
    
    //create a custom marker for each feature (with style indicated by the "marker" class and location indicated by each feature's point coordinates) and add to the "map2" variable
    new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map2);
  
}

//define a constant variable "map3" and assign it to a map created with the Mapbox API
const map3 = new mapboxgl.Map({
    container: 'map3', //ID for div where map will be embedded in HTML file
    style: 'mapbox://styles/anamariiaz/cle0d9ufd006u01pakulgdqjr', //link to style URL
    center: [-79.3, 43.765], //starting position [longitude, latitude]
    zoom: 9.2, //starting zoom
    bearing: -17.7, //angle rotation of map
	maxBounds: maxBounds //maximum and minimum scroll bounds
});

//specify events triggered by the loading of the "map3" variable
map3.on('load', () => {

    //add a geojson file source "universities" for Toronto universities
    map3.addSource('universities', {
        type: 'geojson',
        data: 'https://anamariiaz.github.io/data/universities.geojson'
    });
    
    //add and style a layer of symbols "university" from the defined "universities" source
    map3.addLayer({
        'id': 'university',
        'type': 'symbol',
        'source': 'universities',
        'layout': {
            'text-field': ['get', 'name'], //retrieve the value of the "name" property for the points in the geojson file and assign to their symbols' text labels
            'text-variable-anchor': ['bottom'], //specify position of labels relative to the points' coordinates
            'text-radial-offset': 0.5, //specify offset distance of labels from anchor
            'text-font': ["Open Sans SemiBold"],
            'text-justify': 'auto' //align labels to anchor position
        },
        'paint':{'text-color': "#474343"}
    });

    //add a vector tileset source "parking lots" for Toronto parking lots
    map3.addSource('parking lots', { 
        'type': 'vector',
        'url': 'mapbox://anamariiaz.0sm55450' 
    });

    //add and style a fill layer "parking"" from the defined "parking lots" source
    map3.addLayer({
        'id': 'parking',
        'type': 'fill',
        'source': 'parking lots', 
        'paint': {
            'fill-color': '#000000',
            'fill-opacity': 0.5, //modify opacity to allow symbols placed atop the polygons to be visible
            'fill-outline-color': 'white'
        },
        'source-layer': 'parking_lots-ay29hm' 
    },
         'university' //place "parking" fill layer below "university" symbol layer
    );

});

//loop through each feature in the "universities" geojson variable
for (const feature of universities.features) {

    //create HTML element for each feature and assign to class "marker"
    const el = document.createElement('div');
    el.className = 'marker';
    
    //create a custom marker for each feature (with style indicated by the "marker" class and location indicated by each feature's point coordinates) and add to the "map3" variable
    new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map3);
    
}