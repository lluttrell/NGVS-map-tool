import 'leaflet'
import 'leaflet/dist/leaflet.css'
import './styles/searchbar.css'
import { config } from '../app.config'

/**
 * This class is used to render a search bar that allows a user to search
 * for object names or coordinates, and plots the results as a marker on a leaflet
 * map instance. It queries the cadc name resolving service to parse object names or
 * coordinate pairs in a reasonable format into a location that can be plotted.
 */
class SearchBar {
  constructor(lMap) {
    this.mapObj = lMap
    this.searchBoxContent = ''
    this.layerGroup = L.layerGroup()
    this.layerGroup.addTo(this.mapObj.lMap)
    this.searchHistory = JSON.parse(window.localStorage.getItem('searchHistory')) || ['']
    this.searchHistoryPosition = 0
  }

  /**
   * Renders searchbar inside a node element in the DOM
   * @param {HTMLElement} node Node to which append searchbar to
   */
  render(node) {
    let searchBar = document.createElement('div')
    searchBar.classList.add('input-field','col','s10')

    let searchBoxInput = document.createElement('textarea')
    searchBoxInput.classList.add('materialize-textarea')
    searchBoxInput.id = 'searchbox-input'
    searchBoxInput.setAttribute('placeholder', 'Object/Location Search')
    searchBoxInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this._updateSearchHistory()
        this._performSearch()
        searchBoxInput.value = ''
      } else if (e.key === 'ArrowUp'){
        this._incrementSearchHistoryPosition()
        searchBoxInput.value = this.searchHistory[this.searchHistoryPosition]
      } else if (e.key === 'ArrowDown'){
        this._decrementSearchHistoryPosition()
        searchBoxInput.value = this.searchHistory[this.searchHistoryPosition]
      } else {
        this.searchBoxContent = searchBoxInput.value
      }
    })
    searchBar.appendChild(searchBoxInput)
    
    let searchBoxImage = document.createElement('i')
    searchBoxImage.classList.add('material-icons','prefix')
    searchBoxImage.innerText = 'search'
    searchBar.appendChild(searchBoxImage)
    
    node.appendChild(searchBar)
  }

  _decrementSearchHistoryPosition() {
    if (this.searchHistoryPosition > 0) this.searchHistoryPosition--
  }

  _incrementSearchHistoryPosition() {
    if (this.searchHistoryPosition < this.searchHistory.length - 1) this.searchHistoryPosition++
  }

  _updateSearchHistory() {
    this.searchHistory.splice(1, 0, this.searchBoxContent)
    if (this.searchHistory.length > config.searchHistoryLength) {
      this.searchHistory.length = config.searchHistoryLength
    }
    window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
  }

  /**
  * Method used when user searches for an object. If a search is succesful it updates
  * the searchMarker in the map object. Otherwise notifies the user with a toast. 
  */
  async _performSearch() {
    if (this.searchBoxContent === '') {
      this.layerGroup.clearLayers()
    } else {
      this.layerGroup.clearLayers()
      for (let searchString of this.searchBoxContent.split(/\b\s/)) {
        try {
          let queryResults = await this._queryNameResolver(searchString)
          this.layerGroup.addLayer(this._createSearchMarker(queryResults.name, queryResults.coordinates))
        } catch (e) {
          M.toast({html: e.message, classes:'red lighten-2'})
        }
      }
    }
  }

  /**
   * Queries the cadc name resolver service, if a result is returned from the api
   * returns an object containing the name and coordinates of the search results
   */
  async _queryNameResolver(searchString) {
    let response = await fetch(`https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/AdvancedSearch/unitconversion/Plane.position.bounds?term=${searchString}&resolver=all`)
    let resultObj = await response.json();
    if (resultObj.resolveStatus === "GOOD") {
      return this._parseNameResolverResults(resultObj)
    } else {
      throw new Error(`Search for ${searchString} failed`)
    }
  }

  /**
   * Parses the resolveValue from the cadc name resolver into an object containing
   * the name and coordinates of the resolveValue
   * @param {Object} resultObj
   */
  _parseNameResolverResults(resultObj) {
    let resolveValue = resultObj.resolveValue
    let resolveValues = resolveValue.split('\n');
    let targetDec = parseFloat(resolveValues[1].split(':')[1])
    let targetRA = parseFloat(resolveValues[2].split(':')[1])
    return {
      name: resultObj.resolveTarget,
      coordinates: [targetDec, targetRA]
    }
  }

  _createSearchMarker(name, coordinates) {
    let searchMarker = L.marker(this._toLatLng(coordinates), {
      title: name,
      icon: this._createMarkerIcon(config.searchMarkerColor)
    })
    return searchMarker
  }

  _toLatLng(coordinates) {
    let dec = coordinates[0]
    let ra = coordinates[1];
    if (ra > 180) { ra = 180 - ra };
    return L.latLng([dec,ra]);
  }

   /**
   * Returns a leaflet marker icon
   * @param {string} color icon color (red, blue, green, yellow, black)
   */
  _createMarkerIcon(color) {
    return new L.Icon({
        iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
  }

}

export default SearchBar