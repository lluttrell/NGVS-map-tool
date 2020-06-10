const DEFAULT_MAP_LOCATION = [10.425,-7.037387]
const DEFAULT_ZOOM = 6
  
const googleSky = L.tileLayer("https://mw1.google.com/mw-planetary/sky/skytiles_v1/{x}_{y}_{z}.jpg")
const ngvsTile = L.tileLayer("https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/data/pub/GSKY/M.{x}.{y}.{z}.png")
  
document.addEventListener('DOMContentLoaded', function() {
    let collapsibleElements = document.querySelectorAll('.collapsible');
    let collapsibleInstances = M.Collapsible.init(collapsibleElements);
    
    let tabElement = document.getElementById('query-tab');
    let tabElementInstance = M.Tabs.init(tabElement);

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
    M.updateTextFields();
});

let tileLayers = L.layerGroup([googleSky, ngvsTile])

let myMap = L.map('map-container', {
    center: DEFAULT_MAP_LOCATION,
    zoom: DEFAULT_ZOOM,
    minZoom: 5,
    maxZoom: 14,
    selectArea: true,
    layers: [googleSky, ngvsTile],
    renderer: L.canvas()
})

myMap.on('areaselected', (e) => {
    console.log(e.bounds.toBBoxString()); // lon, lat, lon, lat
  });

let searchMarker = L.marker([0,0], {"opacity" : 0.0}).addTo(myMap);

let baseMaps = {
    "GoogleSky" : googleSky,
    "NGVSTile" : ngvsTile
}

L.control.layers(null,baseMaps, {
    collapsed : false
}).addTo(myMap)


function toLatLng(coordinates) {
    let dec = coordinates['Dec']
    let ra = coordinates['RA'];
    if (ra > 180) { ra = 180 - ra};
    return L.latLng([dec,ra]);
}

const moveSearchMarker = (coordinates) => {
    searchMarker.setLatLng(toLatLng(coordinates))
    searchMarker.setOpacity(1.0);
}

const clearSearchMarker = () => {
    searchMarker.setOpacity(0.0);
}


// Searches for object or coordinate pair
const objectSearchForm = document.getElementById('search-form');
objectSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(objectSearchForm);
    objectSearchForm.reset();
    fetch('http://127.0.0.1:5000/coordinates' , {
        method: 'post',
        body: formData
    }).then((response) => {
        return response.json();  
    }).then((json) => {
        moveSearchMarker(json);
    }).catch((error) => {
        clearSearchMarker();
    })
});

// Retrieves list of catalogs
async function getCatalogs() {
    const response = await fetch('http://127.0.0.1:5000/coordinates')
    return response.json()
}


// Retrieves list of catalog names and populates the select list
function populateQueryList() {
    getCatalogs()
        .then(response => response.json())
        .then((catalogList) => {
            for (let catalog of catalogList) {
                let selectForm = document.getElementById('catalog-select');
                let optionElement = document.createElement("option");
                optionElement.setAttribute("value", catalog)
                optionElement.innerHTML = catalog;
                selectForm.appendChild(optionElement)
            }
        }).then(() => {
            let catalogSelect = document.getElementById('catalog-select');
            let catalogSelectInstance = M.FormSelect.init(catalogSelect);
        });
}

// Plots clusters on map (prototyping)
const getObjectLocations = (catalogName) => {
    fetch(`http://127.0.0.1:5000/catalogs/${catalogName}/query`)
        .then(response => response.json())
        .then((object) => {
            let markers = L.markerClusterGroup();
            for (let [name,coordinates] of Object.entries(object)) {
                let myMarker = L.marker(coordinates, {
                    title: name
                }).on('click', () => displayObjectInformation(catalogName,name));
                markers.addLayer(myMarker);
            }
            markers.addTo(myMap);
        })
}

//Plots circles on a map
function getObjectCircles(catalogName) {
    fetch(`http://127.0.0.1:5000/catalogs/${catalogName}/query`)
        .then(response => response.json())
        .then((object) => {
            for (let [name,coordinates] of Object.entries(object)) {
                let myMarker = L.circleMarker(coordinates, {
                    radius: 0.5,
                    weight: 0.5}).on('click', () => displayObjectInformation(catalogName,name));
                myMarker.addTo(myMap);
            }
        })
}

//Plots circles on a map
function getObjectHeat(catalogName) {
    fetch(`http://127.0.0.1:5000/catalogs/${catalogName}/query`)
        .then(response => response.json())
        .then((object) => {
            locations = []
            for (let [name,coordinates] of Object.entries(object)) {
                locations.push(coordinates)
            }
            let heat = L.heatLayer(locations, {
                radius: 5,
                blur: 5,
                minOpacity: 25
            }).addTo(myMap)

        })
}

// Retrieves all information about a single object
function displayObjectInformation(catalogName, objectID) {
    fetch(`http://127.0.0.1:5000/catalogs/${catalogName}/query_object/${objectID}`)
        .then(response => response.json())
        .then(objectInformation => {
            for(let [key,value] of Object.entries(objectInformation)) {
                console.log(`${key}:${value}`)
            }
        })
}