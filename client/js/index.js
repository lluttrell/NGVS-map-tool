const DEFAULT_MAP_LOCATION = [10.425,-7.037387]
const DEFAULT_ZOOM = 6
  
const googleSky = L.tileLayer("https://mw1.google.com/mw-planetary/sky/skytiles_v1/{x}_{y}_{z}.jpg")
const ngvsTile = L.tileLayer("https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/data/pub/GSKY/M.{x}.{y}.{z}.png")
  
document.addEventListener('DOMContentLoaded', function() {
    let collapsibleElements = document.querySelectorAll('.collapsible');
    let collapsibleInstances = M.Collapsible.init(collapsibleElements);
    
    populateQueryList();

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

function moveSearchMarker(coordinates) {
    searchMarker.setLatLng(toLatLng(coordinates))
    searchMarker.setOpacity(1.0);
}

function clearSearchMarker() {
    searchMarker.setOpacity(0.0);
}


const objectSearchReset = document.getElementById('object-clear')
objectSearchReset.addEventListener('click', () => clearSearchMarker());

// Searches for object or coordinate pair
const objectSearchForm = document.getElementById('object-search-form');
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
        console.log(error);
    })
});

// Retrieves list of catalog names and populates the select list
function populateQueryList() {
    fetch('http://127.0.0.1:5000/catalogs')
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