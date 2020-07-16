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
import FieldOutlines from './field-outlines'
import FITSManager from './fits'

const GOOGLE_SKY_TILESET = L.tileLayer(config.skyTileUrl)
const NGVS_TILE_TILESET = L.tileLayer(config.ngvsTileUrl)
const fitsmgr = new FITSManager();

let myMap = L.map('map-container', {
    center: config.defaultMapLocation,
    zoom: config.defaultZoom,
    minZoom: config.minZoom,
    maxZoom: config.maxZoom,
    selectArea: true,
    layers: [GOOGLE_SKY_TILESET, NGVS_TILE_TILESET],
    // renderer: L.canvas()
    preferCanvas: true
})

myMap.on('areaselected', (e) => {
    displayAreaSelectionInformation(e.bounds)
  });

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
    let dec = coordinates[0]
    let ra = coordinates[1];
    if (ra > 180) { ra = 180 - ra};
    return L.latLng([dec,ra]);
}

const moveSearchMarker = (name, coordinates) => {
    searchMarker.setLatLng(toLatLng(coordinates));
    searchMarker.bindTooltip(`${name}`)
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
const objectSearchBox = document.getElementById('search-box');
objectSearchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchString = objectSearchBox.value;
    objectSearchForm.reset();
    const response = await fetch(`https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/AdvancedSearch/unitconversion/Plane.position.bounds?term=${searchString}&resolver=all`)
    const resultJSON = await response.json();
    if (resultJSON.resolveStatus === "GOOD") {
        // the resolveValue object is (strangely) not valid JSON so needs to be manually parsed
        // this will need to be changed if the API changes
        const resolveValues = resultJSON.resolveValue.split('\n');
        let targetName = resolveValues[0].split(':')[1]
        let targetDec = parseFloat(resolveValues[1].split(':')[1])
        let targetRA = parseFloat(resolveValues[2].split(':')[1])
        moveSearchMarker(targetName, [targetDec, targetRA]);
    } else {
        M.toast({html: 'Search Failed'})
        clearSearchMarker()
    }
})


/**
 * Creates the overlays for the field outlines
 */
const createFilterOverlays = () => {
    let fieldOutlines = new FieldOutlines();
    let layersControl = L.control.layers(null,null,{collapsed: false});
    for (const field of Object.keys(fieldOutlines)) {
        const latlngs = fieldOutlines[field].coordinates;
        const color = fieldOutlines[field].color;
        const layers = L.layerGroup();
        const polygon = L.polygon(latlngs, {color: color, fillOpacity: 0.0})
        polygon.addTo(layers)
        layersControl.addOverlay(layers,field);
    }
    layersControl.addTo(myMap);
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
 * @param {Catalog} catalog catalog name for input field 
 * @param {string} principleColumn principle column name fo input field
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
 * @param {Catalog} catalog catalog to create buttons for
 * @param {string} catalogLayer le
 */
const createButtonDiv = (catalog, catalogLayer) => {
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
    catalogLayerControl.removeLayer(catalogLayer)
    catalogLayer.remove();
    catalogLayer.clearLayers();
    for (let [name,lon,lat] of catalog.currentQuery) {
        let coordinates = L.latLng(lat,lon)
        let myMarker = L.circle(coordinates, {
            radius: catalog.markerSize,
            color: catalog.markerColor,
            weight: 1})
        myMarker.bindTooltip(`${name} (${catalog.name})`)                   
        myMarker.on('click', () => displayObjectInformation(catalog, name));
        myMarker.addTo(catalogLayer);
    }
    catalogLayer.addTo(myMap)
    catalogLayerControl.addOverlay(catalogLayer, catalog.name);
}

/**
 * Downloads the currentDownload from a catalog in csv format
 * @param {Catalog} catalog
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
    catalogLayer.remove();
    catalogLayerControl.removeLayer(catalogLayer);
    catalogLayer.clearLayers();
}


/**
 * Displays information about a single object in a modal popup window
 * @param {string} catalogName 
 * @param {string} objectID 
 */
const displayObjectInformation = async (catalog, objectID) => {
    await catalog.queryObject(objectID)
    let elem = document.getElementById('object-modal')
    document.getElementById('modal-object-name').innerText = objectID;
    const instance = M.Modal.init(elem, {dismissible: true});
    const tableBody = document.getElementById('object-table-body')
    for(let [key,value] of Object.entries(catalog.currentObjectQuery)) {
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
}

const createFITSFilterSelectionButtons = () => {
    const buttonDiv = document.createElement('div')
    for (const filter of config.filters) {
        const button = document.createElement('label')
        button.classList.add('fits-selection-label')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type','checkbox')
        checkbox.classList.add('filled-in')
        if (!fitsmgr.availableFilters.has(filter)) checkbox.setAttribute('disabled','disabled')
        if (fitsmgr.selectedFilters.includes(filter)) checkbox.setAttribute('checked','checked')
        checkbox.addEventListener('change', (e) => {
            if (!e.target.checked) {
                // this is really confusing as there are two filters and i'm using the filter function
                fitsmgr.selectedFilters = fitsmgr.selectedFilters.filter(f => f != filter)
            } else {
                fitsmgr.selectedFilters.push(filter)
            }
            refreshFITSSelectionOverview();
        })
        const name = document.createElement('span')
        name.innerText = filter
        button.appendChild(checkbox)
        button.appendChild(name)
        buttonDiv.appendChild(button)
    }
    return buttonDiv
}

const createFITSExposureSelectionButtons = () => {
    const buttonDiv = document.createElement('div')
    for (const exposure of config.exposures) {
        const button = document.createElement('label')
        button.classList.add('fits-selection-label')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type','checkbox')
        checkbox.classList.add('filled-in')
        if (!fitsmgr.availableExposures.has(exposure)) checkbox.setAttribute('disabled','disabled')
        if (fitsmgr.selectedExposures.includes(exposure)) checkbox.setAttribute('checked','checked')
        checkbox.addEventListener('change', (e) => {
            if (!e.target.checked) {
                fitsmgr.selectedExposures = fitsmgr.selectedExposures.filter(f => f != exposure)
            } else {
                fitsmgr.selectedExposures.push(exposure)
            }
            refreshFITSSelectionOverview();
        })
        const name = document.createElement('span')
        name.innerText = exposure
        button.appendChild(checkbox)
        button.appendChild(name)
        buttonDiv.appendChild(button)
    }
    return buttonDiv
}

const createFITSStackedSelectionButtons = () => {
    const buttonDiv = document.createElement('div')
    for (const pipeline of config.stackedPipelines) {
        const button = document.createElement('label')
        button.classList.add('fits-selection-label')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type','checkbox')
        checkbox.classList.add('filled-in')
        if (!fitsmgr.availableStackedPipelines.has(pipeline)) checkbox.setAttribute('disabled','disabled')
        if (fitsmgr.selectedStackedPipelines.includes(pipeline)) checkbox.setAttribute('checked','checked')
        checkbox.addEventListener('change', (e) => {
            if (!e.target.checked) {
                fitsmgr.selectedStackedPipelines = fitsmgr.selectedStackedPipelines.filter(f => f != pipeline)
            } else {
                fitsmgr.selectedStackedPipelines.push(pipeline)
            }
            refreshFITSSelectionOverview();
        })
        const name = document.createElement('span')
        name.innerText = pipeline
        button.appendChild(checkbox)
        button.appendChild(name)
        buttonDiv.appendChild(button)
    }
    return buttonDiv
}

const createFITSIndividualSelectionButtons = () => {
    const buttonDiv = document.createElement('div')
    for (const pipeline of config.individualPipelines) {
        const button = document.createElement('label')
        button.classList.add('fits-selection-label')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type','checkbox')
        checkbox.classList.add('filled-in')
        if (!fitsmgr.availableIndividualPipelines.has(pipeline)) checkbox.setAttribute('disabled','disabled')
        if (fitsmgr.selectedIndividualPipelines.includes(pipeline)) checkbox.setAttribute('checked','checked')
        checkbox.addEventListener('change', (e) => {
            if (!e.target.checked) {
                fitsmgr.selectedIndividualPipelines = fitsmgr.selectedIndividualPipelines.filter(f => f != pipeline)
            } else {
                fitsmgr.selectedIndividualPipelines.push(pipeline)
            }
            refreshFITSSelectionOverview();
        })
        const name = document.createElement('span')
        name.innerText = pipeline
        button.appendChild(checkbox)
        button.appendChild(name)
        buttonDiv.appendChild(button)
    }
    return buttonDiv
}

/**
 * Constructs a table element for the table containing links and information about
 * the availiable fits images for the current selection. For internal use in the 
 * createFITSSelectionOverview method
 */
const createFITSImageTable = () => {
    const table = document.createElement('table')
    const tableHead = document.createElement('thead')
    const row = document.createElement('tr')
    for (const title of ['Filter','Exposure','Stacked','Proccesing','Pointing','Link']) {
        const titleColumn = document.createElement('th')
        titleColumn.innerText = title
        row.appendChild(titleColumn)
    }
    tableHead.appendChild(row)
    table.appendChild(tableHead)
    const tableBody = document.createElement('tbody')
    for (let link of fitsmgr.downloadList) {
        const row = document.createElement('tr');
        const filterCol = document.createElement('th');
        filterCol.innerText = link.filter;
        const processingCol = document.createElement('th');
        processingCol.innerText = link.pipeline;
        const exposureCol = document.createElement('th');
        exposureCol.innerText = link.exposure;
        const pointingCol = document.createElement('th');
        pointingCol.innerText = link.pointing;
        const stackedCol = document.createElement('th');
        stackedCol.innerText = link.stacked;
        const linkCol = document.createElement('th');
        linkCol.innerHTML = `<a href='${link.url}'>${link.publisherID.split('?')[1].split('/')[1]}</a>`;
        row.append(filterCol, exposureCol, stackedCol, processingCol, pointingCol, linkCol);
        tableBody.appendChild(row)
    }
    table.appendChild(tableBody)
    return table
}

/**
 * Constructs a div containing information about the currently created download list in the
 * fitsmanager. If there is one or more images available for download, also shows a table with
 * details of each file
 */
const createFITSSelectionOverview = () => {
    const selectionOverviewDiv = document.createElement('div')
    selectionOverviewDiv.id = 'fits-selection-overview'
    const overviewPanel = document.createElement('span')
    if (fitsmgr.currentQuery.length == 0) {
        overviewPanel.classList.add('red-text')
        overviewPanel.innerText = 'There are no images available in the selected region.'
    } else if (fitsmgr.downloadList.length == 0) {
        overviewPanel.classList.add('red-text')
        overviewPanel.innerText = 'There are no images available in the selected region that match your selection criteria'
    } else {
        overviewPanel.innerText = `Selection contains ${fitsmgr.downloadList.length} images`
    }
    selectionOverviewDiv.appendChild(overviewPanel)
    if (fitsmgr.downloadList.length != 0) {
        const downloadButton = document.createElement('button')
        downloadButton.innerText='Download All'
        downloadButton.id = 'fits-selection-dl-btn'
        downloadButton.classList.add('btn-flat','teal','white-text','lighten-2')
        downloadButton.addEventListener('click', () => fitsmgr.downloadSelection())
        selectionOverviewDiv.appendChild(downloadButton)
        selectionOverviewDiv.appendChild(createFITSImageTable())
    }
    return selectionOverviewDiv
}

/**
 * Updates the download list in the fits manager, and re-renders the selection table.
 * Modal must be already created to use this method
 */
const refreshFITSSelectionOverview = () => {
    fitsmgr.updateDownloadList()
    const fitsSelectionOverview = document.getElementById('fits-selection-overview')
    fitsSelectionOverview.innerText = ''
    fitsSelectionOverview.appendChild(createFITSSelectionOverview())
}

const displayAreaSelectionInformation = async (selectionBounds) => {
    let elem = document.getElementById('download-modal')
    const instance = M.Modal.init(elem, {dismissible: true});
    const modalBody = document.getElementById('download-modal-content')
    modalBody.innerHTML = '<p>Retrieving selection from database</p>'
    modalBody.innerHTML += '<div class="progress"><div class="indeterminate"></div></div>'
    instance.open();

    const bottomLeft = selectionBounds.getSouthWest()
    const topRight = selectionBounds.getNorthEast()
    await fitsmgr.getPublisherIdAtRegion(bottomLeft, topRight)
    
    modalBody.innerHTML = ''
    const modalTitle = document.createElement('h4')
    modalTitle.innerHTML = 'FITS Image Selection'
    modalBody.appendChild(modalTitle)
    const filterTitle = document.createElement('h6')
    filterTitle.innerText = 'Filters'
    modalBody.appendChild(filterTitle)
    modalBody.appendChild(createFITSFilterSelectionButtons())
    const exposureTitle = document.createElement('h6')
    exposureTitle.innerText = 'Exposures'
    modalBody.appendChild(exposureTitle)
    modalBody.appendChild(createFITSExposureSelectionButtons())
    const stackedTitle = document.createElement('h6')
    stackedTitle.innerText = 'Stacked Images'
    modalBody.appendChild(stackedTitle)
    modalBody.appendChild(createFITSStackedSelectionButtons())
    const individualTitle = document.createElement('h6')
    individualTitle.innerText = 'Single Images'
    modalBody.appendChild(individualTitle)
    modalBody.appendChild(createFITSIndividualSelectionButtons())
    const resultsTitle = document.createElement('h5')
    resultsTitle.innerText = 'Selection Preview'
    modalBody.appendChild(resultsTitle)
    modalBody.appendChild(createFITSSelectionOverview())
}

const initQueryTabBody = (appModel) => {
    const queryTabBody = document.getElementById('query-tab-body')
    for (let catObj of appModel.catalogList) {
        const catalogLayer = L.layerGroup()
        addCatalogToSelectMenu(catObj)
        let refineForm = document.createElement('form')
        refineForm.setAttribute('id', `${catObj.name}-form`)
        refineForm.setAttribute('class', 'refine-form hide row')
        for (let principleColumn of catObj.principleColumns) {
            refineForm.appendChild(createRefineField(catObj, principleColumn))
        }
        refineForm.appendChild(createButtonDiv(catObj, catalogLayer))
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
    createFilterOverlays();
    const appModel = new AppModel()
    await appModel.init();
    initSelectMenu();
    initQueryTabBody(appModel)
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
    M.Tabs.init(document.getElementById('query-tab'));
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    //M.updateTextFields();
});

