// import longOutlineSingleCSV from './assets/field_outlines_long_single.csv'
// import shortOutlineSingleCSV from './assets/field_outlines_short_single.csv'
// import longOutlineStackedCSV from './assets/field_outlines_long_stacked.csv'
// import shortOutlineStackedCSV from './assets/field_outlines_short_stacked.csv'
import Papa from 'papaparse'
import pointingCSV from './assets/ngvs_pointings.csv'
import { config } from '../app.config'

class FieldOutlines {

  constructor() {
    this.pointings = this._parsePointingCSV(pointingCSV)
  }

  async init() {
    await this._fetchFieldOutlines()
    await this._fetchPointings()
  }

  async _fetchPointings() {
    let queryString = ` SELECT DISTINCT target_name, position_bounds
      FROM caom2.Observation as o JOIN caom2.Plane p on o.obsID=p.obsID
      WHERE o.proposal_project='NGVS' AND o.type='OBJECT' AND provenance_name='MEGAPIPE'`

    let response = await fetch(config.endpoints.argus + encodeURIComponent(queryString))
    let csvText = await response.text()
    let csvArray = Papa.parse(csvText).data.slice(0, -1)
    this.pointings = this._parsePointingCSV(csvArray)
  }

  async _fetchFieldOutlines() {
    const maxShortExposureTime = 255
    let fieldOutlineQueryParameters = [
      {
        groupName: 'longSingle',
        exposure: 'single',
        timeExposure: `>${maxShortExposureTime}`,
        provenanceName: `='ELIXIR'`
      },
      {
        groupName: 'shortSingle',
        exposure: 'single',
        timeExposure: `<${maxShortExposureTime}`,
        provenanceName: `='ELIXIR'`
      },
      {
        groupName: 'longStacked',
        exposure: 'stacked',
        timeExposure: `>${maxShortExposureTime}`,
        provenanceName: `='MEGAPIPE'`
      },
      {
        groupName: 'shortStacked',
        exposure: 'stacked',
        timeExposure: `<${maxShortExposureTime}`,
        provenanceName: `='MEGAPIPE'`
      }
    ]

    await Promise.allSettled(fieldOutlineQueryParameters.map(async (obj) => {
      let queryString = `SELECT DISTINCT position_bounds, energy_bandpassName
      FROM caom2.Observation as o JOIN caom2.Plane p on o.obsID=p.obsID
      WHERE o.proposal_project='NGVS' AND o.type='OBJECT' AND provenance_name${obj.provenanceName} AND time_exposure${obj.timeExposure}`

      let response = await fetch(config.endpoints.argus + encodeURIComponent(queryString))
      let csvText = await response.text()
      let csvArray = Papa.parse(csvText).data.slice(0, -1)
      this[obj.groupName] = this._parseFilterOutlineCSV(csvArray, obj.exposure)
    }))
  }

  getPointingLayerGroup() {
    let pointingLayerGroup = L.layerGroup()
    for (let [name, props] of Object.entries(this.pointings)) {
        let pointingBoundary = this._createFieldOutlinePolygon(props,'pointingPane')
        let textIcon = L.divIcon({
            html: name.replace(/(NGVS|M87)/,''),
            className: 'pointing-label',
            iconAnchor: [13,7]
        })
        let pointingLabel = L.marker(pointingBoundary.getBounds().getCenter(), {
          icon: textIcon,
          pane: 'pointingPane'
        })
        pointingLayerGroup.addLayer(pointingBoundary)
        pointingLayerGroup.addLayer(pointingLabel)
    }
    return pointingLayerGroup
  }


  getLongOutlineLayerGroup(filterName) {
    let layerGroup = L.layerGroup()
    if (this.longSingle[filterName]) layerGroup.addLayer(this._createFieldOutlinePolygon(this.longSingle[filterName]))
    if (this.longStacked[filterName]) layerGroup.addLayer(this._createFieldOutlinePolygon(this.longStacked[filterName]))
    return layerGroup
  }

  getShortOutlineLayerGroup(filterName) {
    let layerGroup = L.layerGroup()
    if (this.shortSingle[filterName]) layerGroup.addLayer(this._createFieldOutlinePolygon(this.shortSingle[filterName]))
    if (this.shortStacked[filterName]) layerGroup.addLayer(this._createFieldOutlinePolygon(this.shortStacked[filterName]))
    return layerGroup
  }

  /**
 * Returns a L.polygon object for outline objects in FieldOutline class
 * @param {Object} outlineObj A specifific filter object of one of the five main parameters of FieldOutline class
 */
  _createFieldOutlinePolygon(outlineObj, pane='overlayPane') {
    return L.polygon(outlineObj.coordinates, {
      color: outlineObj.color,
      dashArray: outlineObj.dashArray,
      weight: outlineObj.weight,
      opacity: outlineObj.opacity,
      fillOpacity: 0.0,
      pane: pane
  })
}

  _parsePointingCSV(pointingArray) {
    let pointings = {}
    pointingArray.shift()
    for (let row of pointingArray) {
      let polygonArray = this.constructor._parsePolygon(row[1])
      let pointingName = row[0]
      pointings[pointingName] = {}
      pointings[pointingName].coordinates = polygonArray
      pointings[pointingName].color = config.pointingOutlineColor
      pointings[pointingName].dashArray = config.fieldLineStyles.pointing.dashArray
      pointings[pointingName].weight = config.fieldLineStyles.pointing.weight
      pointings[pointingName].opacity = config.fieldLineStyles.pointing.opacity
    }
    return pointings
  }


  _parseFilterOutlineCSV(outlineArray, exposure) {
    let filters = {}
    outlineArray.shift()
    for (let row of outlineArray) {
      let polygonArray = this.constructor._parsePolygon(row[0])
      let filterName = this.constructor._parseFilterName(row[1])
      if (filterName in filters) {
        filters[filterName].coordinates.push(polygonArray)
      } else {
        filters[filterName] = {}
        filters[filterName].coordinates = [polygonArray]
        filters[filterName].color = config.fieldColors[filterName]
        filters[filterName].dashArray = config.fieldLineStyles[exposure].dashArray
        filters[filterName].weight = config.fieldLineStyles[exposure].weight
        filters[filterName].opacity = config.fieldLineStyles[exposure].opacity
      }
    }
    return filters
  }

  /**
   * Transforms a string representing a polygon in ADQL format, into an array of Dec/RA coordinate pairs.
   * Note the order is Dec/RA to match the standard order lat/lng of geographical coordinates 
   * @param {string} polygonString Polygon in valid ADQL format
   */
  static _parsePolygon(polygonString) {
    let flatArray = polygonString.split(' ')

    if (flatArray.shift() != 'polygon') {
      throw new Error('Invalid ADQL polygon string: String must begin with "polygon" identifier')
    }

    if (flatArray.length % 2 != 0) {
      throw new Error('Invalid ADQL polygon string: String must contain an even number of values to form coordinate pairs')
    }

    flatArray = flatArray.map((x) => {
      let num = Number(x)
      if (num > 180) return (180 - num)
      return num
    })
    
    flatArray.forEach((x) => {
      if (Number.isNaN(x)) throw new Error('Invalid ADQL polygon string: String contains invalid numbers')
    })

    let coordinateArray = []
    while (flatArray.length) coordinateArray.push(flatArray.splice(0,2).reverse())

    return coordinateArray
  }

  /**
   * Parses a string representing a filter name and returns the string if the filter is defined in the configuration file 
   * @param {string} filterString String to parse
  _parseOutlines() {
    return true
  }
   */
  static _parseFilterName(filterString) {
    let filterName = filterString.split('.')[0]
    if (!config.fitsImageCategories.filters.parameters.includes(filterName)) throw new Error(`Invalid Filter Name: ${filterName} is not defined in app.config`)
    return filterName
  }
}

export default FieldOutlines

