const DEFAULT_MAP_LOCATION = [10.425,-7.037387]
const DEFAULT_ZOOM = 6
  
const googleSky = L.tileLayer("https://mw1.google.com/mw-planetary/sky/skytiles_v1/{x}_{y}_{z}.jpg")
const ngvsTile = L.tileLayer("https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/data/pub/GSKY/M.{x}.{y}.{z}.png")
  
document.addEventListener('DOMContentLoaded', function() {
var elems = document.querySelectorAll('.collapsible');
var instances = M.Collapsible.init(elems, {
    accordion: true
});
M.updateTextFields();
});

let tileLayers = L.layerGroup([googleSky, ngvsTile])

let myMap = L.map('map-container', {
    center: DEFAULT_MAP_LOCATION,
    zoom: DEFAULT_ZOOM,
    minZoom: 5,
    maxZoom: 14,
    layers: [googleSky, ngvsTile]
})

let baseMaps = {
    "GoogleSky" : googleSky,
    "NGVSTile" : ngvsTile
}

L.control.layers(null,baseMaps, {
    collapsed : false
}).addTo(myMap)


function searchSubmit(event) {
    console.log("submitted form");
    event.preventDefault();
}

const objectSearchForm = document.getElementById('object-search-form');
objectSearchForm.addEventListener('submit', searchSubmit);