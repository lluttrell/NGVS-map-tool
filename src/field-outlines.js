import longOutlineSingleCSV from './assets/field_outlines_long_single.csv';
import shortOutlineSingleCSV from './assets/field_outlines_short_single.csv';
import longOutlineStackedCSV from './assets/field_outlines_long_stacked.csv';
import shortOutlineStackedCSV from './assets/field_outlines_short_stacked.csv';
import pointingCSV from './assets/ngvs_pointings.csv';
import { config } from '../app.config';

class FieldOutlines {

  constructor() {
    this.longSingle = this._parseFilterOutlineCSV(longOutlineSingleCSV,'single')
    this.shortSingle = this._parseFilterOutlineCSV(shortOutlineSingleCSV,'single')
    this.longStacked = this._parseFilterOutlineCSV(longOutlineStackedCSV,'stacked')
    this.shortStacked = this._parseFilterOutlineCSV(shortOutlineStackedCSV,'stacked')
    this.pointings = this._parsePointingCSV(pointingCSV)
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
   */
  static _parseFilterName(filterString) {
    let filterName = filterString.split('.')[0]
    if (!config.filters.includes(filterName)) throw new Error(`Invalid Filter Name: ${filterName} is not defined in app.config`)
    return filterName
  }

  _parseOutlines() {
    return true
  }
}

export default FieldOutlines

