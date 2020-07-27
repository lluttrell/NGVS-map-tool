import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-mouse-position'
import 'leaflet-mouse-position/src/L.Control.MousePosition.css'
import 'leaflet-groupedlayercontrol'
import 'leaflet.tilelayer.colorfilter'
import SelectArea from 'leaflet-area-select'
import './styles/main.css'
import { hms_formatter, dms_formatter, decimal_dec_formatter, decimal_ra_formatter } from './coordinate-formatter'
import { config } from '../app.config'
import Catalog from './catalog'
import FieldOutlines from './field-outlines'
import FITSManager from './fits'
import Map from './map'

const root = document.getElementsByTagName('html')[0]
const fitsmgr = new FITSManager();
const myMapObj = new Map();
myMapObj.init();

const myMap = myMapObj.lMap;


// adds search functionality to the searchbar
const objectSearchForm = document.getElementById('search-form');
const objectSearchBox = document.getElementById('search-box');
objectSearchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchString = objectSearchBox.value;
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
    } else if(searchString === ''){
        clearSearchMarker()
    } else {
        M.toast({html: 'Search Failed', classes:'red lighten-2'})
    }
})


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
}

const initQueryTabBody = (appModel) => {
    let queryTabBody = document.getElementById('query-tab-body')
    if (appModel.catalogList.length == 0) {
        queryTabBody.innerHTML = '<div class="container"><p>There are no available catalogs</p></div>'
    }
    const selectMenu = document.createElement('select')
    selectMenu.id = 'query-tab-select-menu'
    queryTabBody.appendChild(selectMenu)
    initSelectMenu()
    for (let catObj of appModel.catalogList) {
        addCatalogToSelectMenu(catObj)
        let refineForm = document.createElement('form')
        refineForm.setAttribute('id', `${catObj.name}-form`)
        refineForm.setAttribute('class', 'refine-form hide row')
        for (let principleColumn of catObj.principleColumns) {
            refineForm.appendChild(createRefineField(catObj, principleColumn))
        }
        refineForm.appendChild(createButtonDiv(catObj))
        queryTabBody.appendChild(refineForm)
    }
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
const createButtonDiv = (catalog) => {
    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'col s12 refine-btns')
    let submitButton = document.createElement('input')
    submitButton.setAttribute('value', 'apply')
    submitButton.setAttribute('class', 'btn-small')
    submitButton.setAttribute('type', 'button')
    submitButton.addEventListener('click', async () => {
        root.classList.add('in-progress')
        await catalog.query();
        renderCatalogQuery(catalog);
        root.classList.remove('in-progress')
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
    clearButton.addEventListener('click', () => resetQueryForm(catalog))
    buttonDiv.appendChild(submitButton)
    buttonDiv.appendChild(downloadButton)
    buttonDiv.appendChild(clearButton)
    return buttonDiv
}


const renderCatalogQuery = (catalog) => {
    layerControl.removeLayer(catalog.layerGroup)
    myMap.removeLayer(catalog.layerGroup);
    catalog.layerGroup.clearLayers();
    for (let [name,lon,lat] of catalog.currentQuery) {
        let coordinates = L.latLng(lat,lon)
        let myMarker = L.circle(coordinates, {
            radius: catalog.markerSize,
            color: catalog.markerColor,
            weight: 1})
        myMarker.bindTooltip(`${name} (${catalog.name})`)                   
        myMarker.on('click', () => displayObjectInformation(catalog, name));
        myMarker.addTo(catalog.layerGroup);
    }
    catalog.layerGroup.addTo(myMap)
    layerControl.addOverlay(catalog.layerGroup, catalog.name,'Catalog Queries');
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

const resetQueryForm = (catalog) => {
    document.getElementById(`${catalog.name}-form`).reset();
    myMap.removeLayer(catalog.layerGroup)
    //catalogLayer.remove();
    catalog.layerGroup.clearLayers();
    layerControl.removeLayer(catalog.layerGroup);
}

/**
 * Displays information about a single object in a modal popup window
 * @param {string} catalogName 
 * @param {string} objectID 
 */
const displayObjectInformation = async (catalog, objectID) => {
    let modalElem = document.getElementById('object-modal')
    let modalInstance = M.Modal.init(modalElem, {dismissible: true});
    let modalBody = document.getElementById('object-modal-content')
    modalBody.innerHTML = '<p>Retrieving selection from database</p>'
    modalBody.innerHTML += '<div class="progress"><div class="indeterminate"></div></div>'
    modalInstance.open();
    await catalog.queryObject(objectID)
    modalBody.innerHTML = ''
    const modalTitle = document.createElement('h4')
    modalTitle.innerHTML = objectID
    modalBody.appendChild(modalTitle)
    modalBody.appendChild(createObjectInformationTable(catalog))
    
}

const createObjectInformationTable = (catalog) => {
    let table = document.createElement('table')
    table.classList.add('highlight')
    let tableHead = document.createElement('thead')
    tableHead.innerHTML = '<tr><th>Property</th><th>Value</th></tr>'
    let tableBody = document.createElement('tbody')
    for(let [key,value] of Object.entries(catalog.currentObjectQuery)) {
        let row = document.createElement('tr');
        let property = document.createElement('td');
        property.innerHTML = key;
        let propertyValue = document.createElement('td');
        propertyValue.innerHTML = value;
        row.appendChild(property);
        row.appendChild(propertyValue);
        tableBody.appendChild(row);
    }
    table.append(tableHead,tableBody)
    return table
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
    table.classList.add('highlight')
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
        const filterCol = document.createElement('td');
        filterCol.innerText = link.filter;
        const processingCol = document.createElement('td');
        processingCol.innerText = link.pipeline;
        const exposureCol = document.createElement('td');
        exposureCol.innerText = link.exposure;
        const pointingCol = document.createElement('td');
        pointingCol.innerText = link.pointing;
        const stackedCol = document.createElement('td');
        stackedCol.innerText = link.stacked;
        const linkCol = document.createElement('td');
        linkCol.innerHTML = `<a href='${link.url}'>${link.productID}</a>`;
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
    const resultsTitle = document.createElement('h5')
    resultsTitle.innerText = 'Selection Preview'
    selectionOverviewDiv.appendChild(resultsTitle)
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
        downloadButton.innerText='Download Selection'
        downloadButton.classList.add('btn-flat','teal','white-text','lighten-2','fits-selection-dl-btn')
        downloadButton.addEventListener('click', (e) => {

            openDownloadManager() 
        })
        selectionOverviewDiv.appendChild(downloadButton)
        const downloadTextButton = document.createElement('button')
        downloadTextButton.innerText='Download URL List'
        downloadTextButton.classList.add('btn-flat','red','white-text','lighten-2','fits-selection-dl-btn')
        downloadTextButton.addEventListener('click', () => { fitsmgr.downloadSelectionURLList() })
        selectionOverviewDiv.appendChild(downloadTextButton)
        selectionOverviewDiv.appendChild(createFITSImageTable())
    }
    return selectionOverviewDiv
}


const openDownloadManager = () => {
    //let modal = document.getElementById('download-mgr-modal')
    //let modalInstance = M.Modal.init(modal, {dismissible: true});
    let modalBody = document.getElementById('download-modal-content')
    modalBody.innerText = ''
    let iframe = document.createElement('iframe')
    iframe.name = 'download-mgr-iframe'
    iframe.id = 'download-mgr-iframe'
    modalBody.appendChild(iframe)
    let formElement = fitsmgr.getDownloadManagerForm('download-mgr-iframe')
    iframe.appendChild(formElement)
    formElement.submit();
    //modalInstance.open()
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
    const modalInstance = M.Modal.init(elem, {dismissible: true});
    const modalBody = document.getElementById('download-modal-content')
    modalBody.innerHTML = '<p>Retrieving selection from database</p>'
    modalBody.innerHTML += '<div class="progress"><div class="indeterminate"></div></div>'
    modalInstance.open();
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

    modalBody.appendChild(createFITSSelectionOverview())
}

const createTileAdjustmentSliders = (parameter, minValue, maxValue) => {
    let slider = document.createElement('p')
    slider.classList.add('range-field')
    let input = document.createElement('input')
    input.setAttribute('type','range')
    input.id = parameter
    input.setAttribute('min',minValue)
    input.setAttribute('max',maxValue)
    input.addEventListener('input',(e) => {
        NGVS_TILE_TILESET.updateFilter([`${e.target.id}:${e.target.value}%`])
    })
    let label = document.createElement('label')
    label.setAttribute('for', parameter)
    label.innerText = parameter
    slider.appendChild(input)
    slider.appendChild(label)
    return slider
}


const initAdjustmentTabBody = () => {
    let adjustmentTabBody = document.getElementById('adjustment-tab-body')
    for (let prop of ['contrast','saturation','brightness']) {
        let slider = createTileAdjustmentSliders(prop, 0, 100)
        adjustmentTabBody.appendChild(slider)
    }
}

class App {
    constructor() {
        this.catalogList = []
        this.currentCatalog = null
    }

    async init() {
        for (let [catalogName, color] of config.catalogList.map((e, i) => [e, config.colors[i]])) {
            try {
                let catalog = new Catalog(catalogName, color);
                await catalog.init();
                this.catalogList.push(catalog)
            } catch(e) {
                M.toast({html: `Failed to load ${catalogName}: Permission Denied`, classes:'red lighten-2'})
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', async function() {

    root.classList.add('in-progress')
    createPointingOverlays();
    createFilterOverlays();
    const appModel = new App()
    await appModel.init();
    initQueryTabBody(appModel)
    initAdjustmentTabBody();
    M.Collapsible.init(document.querySelectorAll('.collapsible'), {accordion: false});
    M.Tabs.init(document.getElementById('query-tab'));
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    root.classList.remove('in-progress')
});

