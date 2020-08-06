import { config } from '../app.config'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

/**
 * Class to render a list of sliders that control the TileSet Filter for Map object
 */
class AdjustTab {

  /**
   * Creates an instance of AdjustTab
   * @param {Map} mapObj Map to bind controls to
   */
  constructor(mapObj) {
    this.mapObj = mapObj
  }

  /**
   * Renders AjustTab as a child element in node
   * @param {HTMLElement} node node in which to render AdjustTab
   */
  render(node) {
    let formElement = document.createElement('form')
    formElement.setAttribute('action',"#")
    for (let [property, values] of Object.entries(config.tilesetFilters)) {
      let slider = this._createTileAdjustmentSliders(property, values.minValue, values.maxValue, values.defaultValue)
      formElement.appendChild(slider)
    }
    node.appendChild(formElement)
  }

  /**
   * Creates a single HTML slider for a given TilesetFilter parameter name
   * @param {string} parameter paramenter name for slider
   * @param {string} minValue min value for slider
   * @param {string} maxValue max value for slider
   * @param {string} defaultValue default value for slider
   * @return {HTMLElement} HTML paragraph element containing an HTML5 slider 
   */
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