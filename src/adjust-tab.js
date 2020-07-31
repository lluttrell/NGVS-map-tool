import { config } from '../app.config'


class AdjustTab {
  constructor(mapObj) {
    this.mapObj = mapObj
  }


  render(node) {
    for (let [property, values] of Object.entries(config.tilesetFilters)) {
      let slider = this._createTileAdjustmentSliders(property, values.minValue, values.maxValue, values.defaultValue)
      node.appendChild(slider)
    }
  }

  _createTileAdjustmentSliders(parameter, minValue, maxValue, defaultValue) {
    let slider = document.createElement('p')
    slider.classList.add('range-field')
    let input = document.createElement('input')
    input.setAttribute('type','range')
    input.id = parameter
    input.setAttribute('min', minValue)
    input.setAttribute('max', maxValue)
    input.setAttribute('value', defaultValue)
    input.addEventListener('input', e => this.mapObj.adjustTilesetFilter(e.target.id,e.target.value))
    let label = document.createElement('label')
    label.setAttribute('for', parameter)
    label.innerText = parameter
    slider.appendChild(input)
    slider.appendChild(label)
    return slider
  }
}

export default AdjustTab