const DEFAULT_MAP_LOCATION = [10.425,-7.037387]
const DEFAULT_ZOOM = 6
const COLORS = ['green','blue','red', 'yellow'] 

const googleSky = L.tileLayer("https://mw1.google.com/mw-planetary/sky/skytiles_v1/{x}_{y}_{z}.jpg")
const ngvsTile = L.tileLayer("https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/data/pub/GSKY/M.{x}.{y}.{z}.png")

let currentCatalog = ''

document.addEventListener('DOMContentLoaded', async function() {
    await createCatalogQueryMenu();
    let collapsibleElements = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsibleElements);
    let tabElement = document.getElementById('query-tab');
    M.Tabs.init(tabElement);
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
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

const createMarkerIcon = (color) => {
    return new L.Icon({
        iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}


let searchMarker = L.marker([0,0], {
    "opacity" : 0.0,
    "icon": createMarkerIcon('yellow')}).addTo(myMap);

let baseMaps = {
    "GoogleSky" : googleSky,
    "NGVSTile" : ngvsTile
}

L.control.layers(null,baseMaps, {
    collapsed : false
}).addTo(myMap)


const toLatLng = (coordinates) => {
    let dec = coordinates['Dec']
    let ra = coordinates['RA'];
    if (ra > 180) { ra = 180 - ra};
    return L.latLng([dec,ra]);
}

const moveSearchMarker = (coordinates) => {
    searchMarker.setLatLng(toLatLng(coordinates));
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


const changeCatalog = () => {
    let selectMenu = document.getElementById('query-tab-select-menu');
    let currentCatalogName = selectMenu.value
    let divs = document.getElementsByClassName('refine-form');
    for (div of divs) {
        div.classList.add("hide");
        if (div.id === `${currentCatalogName}-form`) {
            div.classList.remove("hide");
        }
    }
}


// TODO: Refactor this beast
const createCatalogQueryMenu = async () => {
    const catalogList = await downloadCatalogInformation();
    const selectMenu = document.getElementById('query-tab-select-menu');
    const queryTabBody = document.getElementById('query-tab-body');

    let defaultSelect = document.createElement('option');
    defaultSelect.setAttribute('disabled',true);
    defaultSelect.setAttribute('selected', true)
    defaultSelect.setAttribute('value','')
    defaultSelect.innerText = 'Select Catalog';
    selectMenu.appendChild(defaultSelect);
    selectMenu.addEventListener('change', changeCatalog);

    let counter = 0;
    for (catalog of catalogList) {
        const color = COLORS[counter];
        counter++;
        // add catalog names to select input
        const catalogName = catalog.name
        let optionElement = document.createElement('option');
        optionElement.setAttribute('value', catalog.name);
        optionElement.innerHTML = catalog.name;
        selectMenu.appendChild(optionElement);
        // display parameters
        let refineForm = document.createElement('form');
        refineForm.setAttribute('id',`${catalog.name}-form`);
        refineForm.setAttribute('class','refine-form hide');
        refineForm.addEventListener('submit', (event) => {
            const formData = new FormData(refineForm);
            event.preventDefault();
            fetch(`http://127.0.0.1:5000/catalogs/${catalogName}/query`, {
                method: 'post',
                body: formData
            })
            .then(response => response.json())
            .then((object) => {
                for (let [name,coordinates] of Object.entries(object)) {
                    let myMarker = L.circle(coordinates, {
                        radius: 500,
                        color: color,
                        weight: 1}).on('click', () => displayObjectInformation(catalogName,name));
                    myMarker.addTo(myMap);
                }
            })
        })
        for (principleColumn of catalog.principleColumns) {
            let input = document.createElement('input');
            input.setAttribute('name', principleColumn);
            input.setAttribute('placeholder',principleColumn)
            refineForm.appendChild(input);
        }
        // add buttons to form
        let submitButton = document.createElement('button');
        submitButton.innerText = "apply";
        submitButton.classList.add("btn");
        submitButton.setAttribute('name','apply');
        let downloadButton = document.createElement('button');
        downloadButton.innerText = "download";
        downloadButton.classList.add("btn")
        let clearButton = document.createElement('button');
        clearButton.innerText = "clear";
        clearButton.classList.add("btn")
        refineForm.appendChild(submitButton)
        refineForm.appendChild(downloadButton)
        refineForm.appendChild(clearButton)

        queryTabBody.appendChild(refineForm);
    }
    M.FormSelect.init(selectMenu);
}

const downloadCatalogInformation = async () => {
    const response = await fetch('http://127.0.0.1:5000/catalogs')
    return response.json();
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