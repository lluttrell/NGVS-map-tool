import { config } from '../app.config'

/**
 * The TilesetFilter stores a group of CSS image propetries (eg saturation) and their values in the form
 * of a 'filter' object. It is used to generate a list of properties and values that can be used by the leaflet tilefilter extension 
 */
class TilesetFilter {
  /**
   * Creates a new instance of TilesetFilter. Uses properties as definedi in the app.config.js file
   */
  constructor() {
    this.filter = config.tilesetFilters
    for (let filterProperty of Object.keys(this.filter)) {
      this.filter[filterProperty].currentValue = this.filter[filterProperty].defaultValue
    }
    this.stringList = this._getFilterAsList()
  }

  /**
   * Adjust the value of a peroperty in this filter
   * @param {string} propertyName property to adjust
   * @param {string} value value to adjust to
   */
  adjustFilterProperty(propertyName, value) {
    this.filter[propertyName].currentValue = parseInt(value)
    this.stringList = this._getFilterAsList()
  }

  /**
   * Returns the filter in string format that can be read by the leaflet tilefilter extension
   * @return {string} string representation of this.filter
   */
  _getFilterAsList() {
    let filterList = []
    for (let [filterProperty, propertyInfo] of Object.entries(this.filter)) {
      let stringRepresentation = `${filterProperty}:${this.filter[filterProperty].currentValue}%`
      filterList.push(stringRepresentation)
    }
    return filterList
  }
}

export default TilesetFilter