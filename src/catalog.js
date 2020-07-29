import { parseSelectionToConditions } from './query-builder'
import Papa from 'papaparse'
import 'leaflet'

class Catalog {
  constructor(name, markerColor=null, lMap) {
    this.lMap = lMap
    this.name = name;
    this.markerColor = markerColor;
    this.markerSize = 400;
    this.principleColumns = null;
    this.primaryKey = null;
    this.refineParameters = {};
    this.currentQuery = null;
    this.currentObjectQuery = null;
    this.currentDownload = null;
    this.layerGroup = L.layerGroup()
    this.apiEndpointBase = 'https://ws-cadc.canfar.net/youcat/sync?LANG=ADQL&FORMAT=csv&QUERY='
  }

  /**
   * Initializes the catalog object. Queries database to obtain principle column names for the 
   * catalog 
   */
  async init() {
    let queryString = `SELECT TOP 1 * FROM ${this.name}`
    let queryURI = encodeURI(this.apiEndpointBase + queryString)
    let response = await fetch(queryURI, { credentials: 'include'})
    if (response.status == 403) {
      throw new Error(`permission denied on table ${this.name}`)
    }
    let csvText = await response.text()
    this.primaryKey = csvText.split(',')[0];
    this.principleColumns = csvText
      .split(',')
      .filter((attributeName) => attributeName.includes('principle'));
    return 1
  }

  async queryObject(objectName) {
    let queryString = `SELECT * FROM ${this.name} WHERE ${this.primaryKey} = '${objectName}'`
    let queryURI = encodeURI(this.apiEndpointBase + queryString)
    let response = await fetch(queryURI, {credentials: 'include'})
    let csvText = await response.text()
    let csvObj = Papa.parse(csvText, {
      dynamicTyping: true,
      header: true}).data[0]
    this.currentObjectQuery = csvObj
    return 1
  }

  /**
  * queries database with (optional) constaints in refine parameters.
  * sets currentQuery to be an array containing name and coordinates of each object in the catalog
  * that satisfy the refine parameters
  */
  async query(locationOnly=true) {
    let self = this;
    let queryString = ''
    let parametersExist = false
    for (const parameter in this.refineParameters) {
        if (this.refineParameters[parameter] !== '') {
          queryString += parseSelectionToConditions(this.refineParameters[parameter], parameter)
          parametersExist = true
        }
    }
    if (parametersExist) queryString = `WHERE ${queryString}`;
    if (locationOnly) {
      queryString = `SELECT ${self.primaryKey}, principleRA, principleDEC from ${self.name} ${queryString}`
    } else {
      queryString = `SELECT * from ${self.name} ${queryString}`
    }
    let queryURI = encodeURI(this.apiEndpointBase + queryString)
    let response = await fetch(queryURI, {credentials: 'include'})
    let csvText  = await response.text();
    let csvArray = Papa.parse(csvText, {dynamicTyping: true}).data
    csvArray = csvArray.slice(2,-3)
    self.currentQuery = csvArray;
    self.currentDownload = csvText;

    return 1
  }


  /**
  * Downloads the currentDownload from a catalog in csv format
  */
  async downloadQuery() {
    let currentDate = Date.now();
    let blob = new Blob([this.currentDownload], {type: 'text/csv', endings:'native'});
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download =`${this.name}-${currentDate}.csv`;
    link.click();
  }

  async addCurrentQueryToMap() {
    this.removeCurrentQueryFromMap()
    for (let [name,lon,lat] of this.currentQuery) {
        let coordinates = L.latLng(lat,lon)
        let myMarker = L.circle(coordinates, {
            radius: this.markerSize,
            color: this.markerColor,
            weight: 1})
        myMarker.bindTooltip(`${name} (${this.name})`)                   
        myMarker.on('click', () => this.displayObjectInformation(name));
        myMarker.addTo(this.layerGroup);
    }
    this.layerGroup.addTo(this.lMap.lMap)
    this.lMap.layerControl.addOverlay(this.layerGroup, this.name,'Catalog Queries');
  }

  removeCurrentQueryFromMap() {
    this.lMap.layerControl.removeLayer(this.layerGroup);
    this.lMap.lMap.removeLayer(this.layerGroup)
    // layerGroup.clearLayers() is freezing the browser and I can't find a workaround
    // I am reassigning layergroup to a new layerGroup object and it seems like the 
    // garbage collection is working
    this.layerGroup = new L.layerGroup()
  }

  /**
  * Displays information about a single object in a modal popup window
  * @param {string} objectID 
  */
  async displayObjectInformation(objectID) {
    let modalElem = document.getElementById('object-modal')
    let modalInstance = M.Modal.init(modalElem, {dismissible: true});
    let modalBody = document.getElementById('object-modal-content')
    modalBody.innerHTML = '<p>Retrieving selection from database</p>'
    modalBody.innerHTML += '<div class="progress"><div class="indeterminate"></div></div>'
    modalInstance.open();
    await this.queryObject(objectID)
    modalBody.innerHTML = ''
    const modalTitle = document.createElement('h4')
    modalTitle.innerHTML = objectID
    modalBody.appendChild(modalTitle)
    modalBody.appendChild(this.createObjectInformationTable()) 
  }


  createObjectInformationTable() {
    let table = document.createElement('table')
    table.classList.add('highlight')
    let tableHead = document.createElement('thead')
    tableHead.innerHTML = '<tr><th>Property</th><th>Value</th></tr>'
    let tableBody = document.createElement('tbody')
    for(let [key,value] of Object.entries(this.currentObjectQuery)) {
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

  setRefineParameter(parameterName, parameterValue) {
    this.refineParameters[parameterName] = parameterValue;
  }

  getRefineParameterString(parameterName) {
    let parameterValue = this.refineParameters[parameterName]
    if (parameterValue === undefined) {
      return ''
    } else {
      return parameterValue
    }
  }

  clearRefineParameters() {
    this.refineParameters = {}
  }
}

export default Catalog