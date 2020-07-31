import { config } from '../app.config'

class TilesetFilter {
  constructor() {
    this.filter = config.tilesetFilters
    for (let filterProperty of Object.keys(this.filter)) {
      this.filter[filterProperty].currentValue = this.filter[filterProperty].defaultValue
    }
    this.stringList = this._getFilterAsList()
  }

  adjustFilterProperty(propertyName, value) {
    this.filter[propertyName].currentValue = parseInt(value)
    this.stringList = this._getFilterAsList()
  }

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