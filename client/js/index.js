const DEFAULT_MAP_LOCATION = [10.425,-7.037387]
const DEFAULT_ZOOM = 6
const COLORS = ['yellow','red','blue','orange','teal','purple','lightgreen'] 

const GOOGLE_SKY_URL = L.tileLayer("https://mw1.google.com/mw-planetary/sky/skytiles_v1/{x}_{y}_{z}.jpg")
const NGVS_TILE_URL = L.tileLayer("https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/data/pub/GSKY/M.{x}.{y}.{z}.png")

document.addEventListener('DOMContentLoaded', async function() {
    await createCatalogQueryMenu();
    await createFilterOverlays();
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
    M.Tabs.init(document.getElementById('query-tab'));
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.updateTextFields();
});

let tileLayers = L.layerGroup([GOOGLE_SKY_URL, NGVS_TILE_URL])
let queryLayers = L.layerGroup();

let myMap = L.map('map-container', {
    center: DEFAULT_MAP_LOCATION,
    zoom: DEFAULT_ZOOM,
    minZoom: 5,
    maxZoom: 14,
    selectArea: true,
    layers: [GOOGLE_SKY_URL, NGVS_TILE_URL],
    renderer: L.canvas()
})

myMap.on('areaselected', (e) => {
    selectionBounds = e.bounds.toBBoxString();
    downloadSelection(selectionBounds);
  });

const downloadSelection = (bounds) => {
    alert(`this should popup with available fits files for ${bounds}`)
}

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
    "GoogleSky" : GOOGLE_SKY_URL,
    "NGVSTile" : NGVS_TILE_URL
}

let mainLayerControl = L.control.layers(null,baseMaps, {
    collapsed : false
})

mainLayerControl.addTo(myMap)

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

const decimal_ra_formatter = (num) => {
    if(num < 0) { num = (num*-1)+180;} 
    return L.Util.formatNum(num, 3);
};

const decimal_dec_formatter = (num) => {
    return L.Util.formatNum(num, 3);
};

const dms_formatter = (num) => {
    var deg = Math.floor(num) ;
    var frac = Math.abs(num - deg);
    var min = Math.floor(frac * 60);
    var sec = Math.floor(frac * 3600 - min * 60 );
    var fsec = Math.floor((frac * 3600 - min * 60 - sec ) * 10) ;
    return ("00" + deg).slice(-2) + ":" + ("00" + min).slice(-2) + ":" + ( "00" + sec).slice(-2) + "." + fsec;
};

const hms_formatter = (num) => {
    if(num < 0) { num = (num*-1)+180;}
    var hour = Math.floor(num / 15);
    var minute = Math.floor((num/15 - hour)*60);
    var sec = Math.floor(hour * 3600 - minute * 60 );
    var fsec = Math.floor(( hour * 3600 - minute * 60 - sec ) * 100) ;
    return ("00" + hour).slice(-2) + ":" + ("00" + minute).slice(-2) + ":" + ("00" + sec).slice(-2) + "." + fsec;
}

L.control.mousePosition({
    position: 'bottomright',
    separator: ' | ',
    lngFormatter: decimal_ra_formatter,
    latFormatter: decimal_dec_formatter
}).addTo(myMap);

L.control.mousePosition({
    position: 'bottomright',
    separator: ' | ',
    lngFormatter: hms_formatter,
    latFormatter: dms_formatter
}).addTo(myMap);

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



const createFilterOverlays = async () => {
    fetch('http://127.0.0.1:5000/overlays')
        .then(results => results.json())
        .then(filters => {
            let i = 0
            let layersControl = L.control.layers(null,null,{collapsed: false});
            for (const [key,value] of Object.entries(filters)) {
                let latlngs = value;
                let layers = L.layerGroup();
                const color = COLORS[i];
                i++;
                const polygon = L.polygon(latlngs, {color: color, fillOpacity: 0.0})
                polygon.addTo(layers)
                layersControl.addOverlay(layers,key);
            }
            layersControl.addTo(myMap);
        })
}

/**
 * Adds a catalog name to the query-tab-select-menu
 * @param {string} catalogName Catalog name to add to menu
 */
const addCatalogToSelectMenu = (catalogName) => {
    const selectMenu = document.getElementById('query-tab-select-menu');
    let optionElement = document.createElement('option');
    optionElement.setAttribute('value', catalogName);
    optionElement.innerHTML = catalogName;
    selectMenu.appendChild(optionElement);
    M.FormSelect.init(selectMenu);
}

/**
 * Initializes the menu for selecting catalogs in the 'query' tab
 */
const initSelectMenu = () => {
    const selectMenu = document.getElementById('query-tab-select-menu');
    let defaultSelect = document.createElement('option');
    defaultSelect.setAttribute('disabled',true);
    defaultSelect.setAttribute('selected', true)
    defaultSelect.setAttribute('value','')
    defaultSelect.innerText = 'Select Catalog';
    selectMenu.appendChild(defaultSelect);
    selectMenu.addEventListener('change', changeCatalog);
    M.FormSelect.init(selectMenu);
}

/**
 * Switches view of refine forms to the form selected in the query-tab-select-menu
 */
const changeCatalog = () => {
    let selectMenu = document.getElementById('query-tab-select-menu');
    let currentCatalogName = selectMenu.value;
    let divs = document.getElementsByClassName('refine-form');
    for (div of divs) {
        div.classList.add("hide");
        if (div.id === `${currentCatalogName}-form`) {
            div.classList.remove("hide");
        }
    }
}

/**
 * Creates a slider to be used for setting the marker size in the query menu
 * @param {String} catalogName Catalog name to create slider for
 */
const createMarkerSizeSlider = (catalogName) => {
    let markerSizeDiv = document.createElement('div');
    markerSizeDiv.setAttribute('class','col s12');
    let markerSizeSlider = document.createElement('input');
    markerSizeSlider.setAttribute('type','range');
    markerSizeSlider.setAttribute('min','100');
    markerSizeSlider.setAttribute('max','5000');
    markerSizeSlider.setAttribute('value','500');
    markerSizeSlider.setAttribute('id',`${catalogName}-markerSizeSlider`);
    let markerSizeLabel = document.createElement('label');
    markerSizeLabel.setAttribute('for',`${catalogName}-markerSizeSlider`);
    markerSizeLabel.innerHTML = 'Marker Size';
    markerSizeDiv.appendChild(markerSizeSlider);
    markerSizeDiv.appendChild(markerSizeLabel);
    return markerSizeDiv;
}

/**
 * Creates an input field for an individual principle column from an individual catalog
 * @param {*} catalogName catalog name for input field 
 * @param {*} principleColumn principle column name fo input field
 */
const createRefineField = (catalogName, principleColumn) => {
    let inputField = document.createElement('div')
    inputField.setAttribute('class', 'input-field col s6')
    let input = document.createElement('input')
    input.setAttribute('name', principleColumn)
    input.setAttribute('type', 'text')
    input.setAttribute('id', `${catalogName}-${principleColumn}`)
    let label = document.createElement('label')
    label.setAttribute('for', `${catalogName}-${principleColumn}`)
    label.innerHTML = `${principleColumn.slice(9)}`
    inputField.appendChild(label)
    inputField.appendChild(input)
    return inputField
}

const  createButtonDiv = (catalogName, refineForm, catalogLayer) => {
    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'col s12 refine-btns')
    let submitButton = document.createElement('button')
    submitButton.innerText = "apply"
    submitButton.setAttribute('class', "btn-small")
    submitButton.setAttribute('name', 'apply')
    let downloadButton = document.createElement('input')
    downloadButton.setAttribute('value', 'download')
    downloadButton.setAttribute('type', 'button')
    downloadButton.setAttribute('class', 'btn-small orange lighten-2')
    downloadButton.addEventListener('click', () => downloadQuery(catalogName, refineForm))
    let clearButton = document.createElement('input')
    clearButton.setAttribute('type', 'button')
    clearButton.setAttribute('value', 'clear')
    clearButton.setAttribute('class', 'btn-small red lighten-3')
    clearButton.addEventListener('click', () => resetQueryForm(catalogName, catalogLayer))
    buttonDiv.appendChild(submitButton)
    buttonDiv.appendChild(downloadButton)
    buttonDiv.appendChild(clearButton)
    return buttonDiv
}

// TODO: Refactor this horrible thing i've created
const createCatalogQueryMenu = async () => {
    const catalogList = await downloadCatalogInformation();
    const queryTabBody = document.getElementById('query-tab-body');
    initSelectMenu();
    
    let counter = 0;
    for (catalog of catalogList) {
        const color = COLORS[counter];
        const catalogName = catalog.name;
        counter++;
        // add catalog names to select input
        addCatalogToSelectMenu(catalogName);
        let catalogLayer = L.layerGroup();
        
        // display parameters
        let refineForm = document.createElement('form');
        refineForm.setAttribute('id',`${catalogName}-form`);
        refineForm.setAttribute('class','refine-form hide row');
        refineForm.addEventListener('submit', (event) => {
            const formData = new FormData(refineForm);
            event.preventDefault();
            fetch(`http://127.0.0.1:5000/catalogs/${catalogName}/query`, {
                method: 'post',
                body: formData
            })
            .then(response => response.json())
            .then((object) => {
                catalogLayer.clearLayers();
                let markerSize = document.getElementById(`${catalogName}-markerSizeSlider`).value;
                mainLayerControl.removeLayer(catalogLayer);
                mainLayerControl.addOverlay(catalogLayer, catalogName);
                for (let [name,coordinates] of Object.entries(object)) {
                    let myMarker = L.circle(coordinates, {
                        radius: markerSize,
                        color: color,
                        weight: 1})
                    myMarker.bindTooltip(`${name} (${catalogName})`)                   
                    myMarker.on('click', () => displayObjectInformation(catalogName,name));
                    myMarker.addTo(catalogLayer);
                }  
            })
        })
       
        refineForm.appendChild(createMarkerSizeSlider(catalogName));
        for (principleColumn of catalog.principleColumns) {
            refineForm.appendChild(createRefineField(catalogName, principleColumn));
        }
        // add buttons to form
        refineForm.appendChild(createButtonDiv(catalogName, refineForm, catalogLayer));
        queryTabBody.appendChild(refineForm);
    }
    M.updateTextFields();
}


/**
 * Downloads all entries from catalogName that match the constraints in refineform
 * @param {*} catalogName 
 * @param {*} refineForm 
 */
const downloadQuery = (catalogName, refineForm) => {
    const formData = new FormData(refineForm);
    fetch(`http://127.0.0.1:5000/catalogs/${catalogName}/download`, {
                method: 'post',
                body: formData
    })
    .then(response => response.text())
    .then((data) => {
        let currentDate = Date.now();
        let blob = new Blob([data]);
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download =`${catalogName}-${currentDate}.csv`;
        link.click();
    })
}

const resetQueryForm = (catalogName, catalogLayer) => {
    document.getElementById(`${catalogName}-form`).reset();
    mainLayerControl.removeLayer(catalogLayer);
    catalogLayer.clearLayers();

}

const downloadCatalogInformation = async () => {
    const response = await fetch('http://127.0.0.1:5000/catalogs')
    return response.json();
}

// Retrieves all information about a single object
const displayObjectInformation = (catalogName, objectID) => {
    fetch(`http://127.0.0.1:5000/catalogs/${catalogName}/query_object/${objectID}`)
        .then(response => response.json())
        .then(objectInformation => {
            let elem = document.getElementById('object-modal')
            document.getElementById('modal-object-name').innerText = objectID;
            const instance = M.Modal.init(elem, {dismissible: true});

            const tableBody = document.getElementById('object-table-body')
            for(let [key,value] of Object.entries(objectInformation)) {
                const row = document.createElement('tr');
                const property = document.createElement('th');
                property.innerHTML = key;
                const propertyValue = document.createElement('th');
                propertyValue.innerHTML = value;
                row.appendChild(property);
                row.appendChild(propertyValue);
                tableBody.appendChild(row);
            }
            instance.open();
        })
}




