import { config } from '../app.config'

class TilesetFilter {
  constructor() {
    this.filter = config.tilesetFilters
    for (let filterProperty of Object.keys(this.filter)) {
      this.filter[filterProperty].currentValue = this.filter[filterProperty].defaultValue
    }
  }

  adjustFilterProperty(propertyName, value) {
    this.filterList[filterName].currentValue = value
  }

  getFilterAsList() {
    let filterList = []
    for (let [filterProperty, propertyInfo] of Object.entries(this.filter)) {
      let stringRepresentation = `${filterProperty}:${filter[propertyInfo].currentValue}%`
      filterList.push(stringRepresentation)
    }
    return filterList
  }
}

export default TilesetFilter