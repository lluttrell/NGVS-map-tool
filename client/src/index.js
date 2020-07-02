import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-mouse-position'
import 'leaflet-mouse-position/src/L.Control.MousePosition.css'
import SelectArea from 'leaflet-area-select'
import './styles/main.css'
import { hms_formatter, dms_formatter, decimal_dec_formatter, decimal_ra_formatter } from './coordinate-formatter'
import { config } from '../app.config'
import Catalog from './catalog'

const GOOGLE_SKY_TILESET = L.tileLayer(config.skyTileUrl)
const NGVS_TILE_TILESET = L.tileLayer(config.ngvsTileUrl)

let tileLayers = L.layerGroup([GOOGLE_SKY_TILESET, NGVS_TILE_TILESET])

let myMap = L.map('map-container', {
    center: config.defaultMapLocation,
    zoom: config.defaultZoom,
    minZoom: config.minZoom,
    maxZoom: config.maxZoom,
    selectArea: true,
    layers: [GOOGLE_SKY_TILESET, NGVS_TILE_TILESET],
    renderer: L.canvas()
})

myMap.on('areaselected', (e) => {
    let selectionBounds = e.bounds.toBBoxString();
    downloadSelection(selectionBounds);
  });

const downloadSelection = (bounds) => {
    alert(`this should popup with available fits files for ${bounds}`)
}

/**
 * Returns a leaflet marker icon
 * @param {string} color icon color (red, blue, green, yellow, black)
 */
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
    "GoogleSky" : GOOGLE_SKY_TILESET,
    "NGVSTile" : NGVS_TILE_TILESET
}

let mainLayerControl = L.control.layers(null,baseMaps, {
    collapsed : false
})
mainLayerControl.addTo(myMap)

let catalogLayerControl = L.control.layers(null,null, {
    collapsed : false
})

mainLayerControl.addTo(myMap)
catalogLayerControl.addTo(myMap)

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

// adds search functionality to the searchbar
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

/**
 * Creates the overlays for the field outlines
 */
const createFilterOverlays = async () => {
    fetch('http://127.0.0.1:5000/overlays')
        .then(results => results.json())
        .then(filters => {
            let i = 0
            let layersControl = L.control.layers(null,null,{collapsed: false});
            for (const [key,value] of Object.entries(filters)) {
                let latlngs = value;
                let layers = L.layerGroup();
                const color = config.colors[i];
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
 * @param {Catalog} catalog Catalog to add to menu
 */
const addCatalogToSelectMenu = (catalog) => {
    const selectMenu = document.getElementById('query-tab-select-menu');
    let optionElement = document.createElement('option');
    optionElement.setAttribute('value', catalog.name);
    optionElement.innerHTML = catalog.name;
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
    for (let div of divs) {
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
const createRefineField = (catalog, principleColumn) => {
    let inputField = document.createElement('div')
    inputField.setAttribute('class', 'input-field col s6')
    let input = document.createElement('input')
    input.setAttribute('name', principleColumn)
    input.setAttribute('type', 'text')
    input.setAttribute('id', `${catalog.name}-${principleColumn}`)
    input.addEventListener('input', () => {
        catalog.refineParameters[principleColumn] = input.value;
    })
    let label = document.createElement('label')
    label.setAttribute('for', `${catalog.name}-${principleColumn}`)
    label.innerHTML = `${principleColumn.slice(9)}`
    inputField.appendChild(label)
    inputField.appendChild(input)
    return inputField
}


/**
 * Creates the apply, clear, and download buttons for the refine section
 * @param {*} catalogName Catalog name for buttons
 * @param {*} refineForm 
 * @param {*} catalogLayer 
 */
const  createButtonDiv = (catalog, refineForm, catalogLayer) => {
    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'col s12 refine-btns')
    let submitButton = document.createElement('input')
    submitButton.setAttribute('value', 'apply')
    submitButton.setAttribute('class', 'btn-small')
    submitButton.setAttribute('type', 'button')
    submitButton.addEventListener('click', async () => {
        await catalog.query();
        renderCatalogQuery(catalog, catalogLayer);
    })
    let downloadButton = document.createElement('input')
    downloadButton.setAttribute('value', 'download')
    downloadButton.setAttribute('type', 'button')
    downloadButton.setAttribute('class', 'btn-small orange lighten-2')
    downloadButton.addEventListener('click', async () => {
        await catalog.query(false)
        downloadQuery(catalog)
    })
    let clearButton = document.createElement('input')
    clearButton.setAttribute('type', 'button')
    clearButton.setAttribute('value', 'clear')
    clearButton.setAttribute('class', 'btn-small red lighten-2')
    clearButton.addEventListener('click', () => resetQueryForm(catalog, catalogLayer))
    buttonDiv.appendChild(submitButton)
    buttonDiv.appendChild(downloadButton)
    buttonDiv.appendChild(clearButton)
    return buttonDiv
}

const renderCatalogQuery = (catalog, catalogLayer) => {
    catalogLayer.clearLayers();
    catalogLayerControl.removeLayer(catalogLayer);
    catalogLayerControl.addOverlay(catalogLayer, catalog.name);
    for (let [name,lon,lat] of catalog.currentQuery) {
        let coordinates = L.latLng(lat,lon)
        let myMarker = L.circle(coordinates, {
            radius: catalog.markerSize,
            color: catalog.markerColor,
            weight: 1})
        myMarker.bindTooltip(`${name} (${catalog.name})`)                   
        myMarker.on('click', () => displayObjectInformation(catalog.name,name));
        myMarker.addTo(catalogLayer);
    }
}

/**
 * Downloads all entries from catalogName that match the constraints in refineform
 * @param {string} catalogName 
 * @param {string} refineForm 
 */
const downloadQuery = (catalog) => {
    let currentDate = Date.now();
    let blob = new Blob([catalog.currentDownload], {type: 'text/csv', endings:'native'});
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download =`${catalog.name}-${currentDate}.csv`;
    link.click();
}

const resetQueryForm = (catalog, catalogLayer) => {
    document.getElementById(`${catalog.name}-form`).reset();
    catalogLayerControl.removeLayer(catalogLayer);
    catalogLayer.clearLayers();

}

/**
 * Displays information about a single object in a modal popup window
 * @param {string} catalogName 
 * @param {string} objectID 
 */
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

const initQueryTabBody = (appModel) => {
    const queryTabBody = document.getElementById('query-tab-body')
    for (let catObj of appModel.catalogList) {
        let catalogLayer = L.layerGroup()
        addCatalogToSelectMenu(catObj)
        let refineForm = document.createElement('form')
        refineForm.setAttribute('id', `${catObj.name}-form`)
        refineForm.setAttribute('class', 'refine-form hide row')
        for (let principleColumn of catObj.principleColumns) {
            refineForm.appendChild(createRefineField(catObj, principleColumn))
        }
        refineForm.appendChild(createButtonDiv(catObj, refineForm, catalogLayer))
        queryTabBody.appendChild(refineForm)
    }
}



class AppModel {
    constructor() {
        this.catalogList = []
        this.currentCatalog = null
    }

    async init() {
        for (let [catalogName, color] of config.catalogList.map((e, i) => [e, config.colors[i]])) {
            let catalog = new Catalog(catalogName, color);
            await catalog.init();
            this.catalogList.push(catalog)
        }
    }


}

document.addEventListener('DOMContentLoaded', async function() {
    await createFilterOverlays();
    const appModel = new AppModel()
    await appModel.init();
    initSelectMenu();
    initQueryTabBody(appModel)
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
    M.Tabs.init(document.getElementById('query-tab'));
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.updateTextFields();
});

