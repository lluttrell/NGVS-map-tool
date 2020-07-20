import longOutlineCSV from './long_filter_outlines.csv';
import shortOutlineCSV from './short_filter_outlines.csv';
import pointings from './ngvs_pointings.csv';
import { config } from '../app.config';

class FieldOutlines {

  constructor() {
    this.longOutlines = this._parseFilterOutlineCSV(longOutlineCSV)
    this.shortOutlines = this._parseFilterOutlineCSV(shortOutlineCSV)
  }

  _parseFilterOutlineCSV(outlineArray) {
    let filters = {}

    outlineArray.shift()
    for (let row of outlineArray) {
      let polygonArray = this.constructor._parsePolygon(row[0])
      let filterName = this.constructor._parseFilterName(row[1])
      if (filterName in filters) {
        filters[filterName].coordinates.push(polygonArray)
      } else {
        filters[filterName] = {}
        filters[filterName].color = config.fieldColors[filterName]
        filters[filterName].coordinates = [polygonArray]
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

