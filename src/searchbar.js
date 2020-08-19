import 'leaflet'
import 'leaflet/dist/leaflet.css'
import './styles/searchbar.css'
import { config } from '../app.config'
import { createCircularLoader } from './utils/loader'

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
    searchBar.id = 'searchbar'
    searchBar.classList.add('input-field','col','s10')

    let searchBoxInput = document.createElement('textarea')
    searchBoxInput.classList.add('materialize-textarea')
    searchBoxInput.id = 'searchbox-input'
    searchBoxInput.setAttribute('placeholder', 'Location Search')
    searchBoxInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        this.searchBoxContent = searchBoxInput.value
        searchBoxInput.value = ''
        if (this.searchBoxContent != '') this._updateSearchHistory()
        this._performSearch()
      } else if (e.key === 'ArrowUp' && e.shiftKey){
        e.preventDefault()
        this._incrementSearchHistoryPosition()
        searchBoxInput.value = this.searchHistory[this.searchHistoryPosition]
      } else if (e.key === 'ArrowDown' && e.shiftKey){
        e.preventDefault()
        this._decrementSearchHistoryPosition()
        searchBoxInput.value = this.searchHistory[this.searchHistoryPosition]
      }
    })
    searchBar.appendChild(searchBoxInput)
    
    let searchBoxImage = document.createElement('i')
    searchBoxImage.id = 'searchbox-image'
    searchBoxImage.classList.add('material-icons','prefix')
    searchBoxImage.innerText = 'add_location_alt'
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
    this.searchHistoryPosition = 0
  }

  _loaderOn() {
    let searchbarImage = document.getElementById('searchbox-image')
    searchbarImage.innerHTML = ''
    searchbarImage.appendChild(createCircularLoader())
  }

  _loaderOff() {
    let searchbarImage = document.getElementById('searchbox-image')
    searchbarImage.innerHTML = 'add_location_alt'
  }

  /**
  * Method used when user searches for an object. If a search is succesful it updates
  * the searchMarker in the map object. Otherwise notifies the user with a toast. 
  */
  async _performSearch() {
    this._loaderOn()
    this.layerGroup.clearLayers()
    // splits text area along newlines and filters out blank lines
    let searchArray = this.searchBoxContent
      .split(/\r?\n/)
      .filter(s => /\S/.test(s))
    
    await Promise.allSettled(searchArray.map(async (searchString) => {
      let exactGalaxyMatch = await this._queryGalaxyCatalogByName(searchString)
      let queryResults = await this._queryTargetResolver(searchString)
      let nearbyGalaxy = await this._queryGalaxyCatalogByCoordinates(queryResults.ra, queryResults.dec)
      console.log(exactGalaxyMatch)
      console.log(queryResults)
      console.log(nearbyGalaxy)
      this.layerGroup.addLayer(this._createSearchMarker(queryResults))
      M.toast({html: 'Search Failed', classes:'red lighten-2'})
    }))
    this._loaderOff()
  }

  /**
   * Queries the cadc name resolver service, if a result is returned from the api
   * returns an object containing the name and coordinates of the search results
   */
  async _queryTargetResolver(searchString) {
    // note: the targetResolver does not seem to accept coordinates with more than one space between
    // RA and Dec components. If this is fixed upstream the replace function should be able to be removed
    let searchURIComponent = encodeURIComponent(searchString.replace(/\s\s+/g,' '))
    let response = await fetch(`https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/cadc-target-resolver/find?target=${searchURIComponent}&service=all&format=json`)
    let result = await response.json()
    if (result.error) return null
    return result
  }

  async _queryGalaxyCatalogByCoordinates(ra, dec) {
    let queryString = 
      `SELECT Official_name 
       FROM cfht.ngvsCatalog as ngvs
       WHERE 1 = CONTAINS(
         POINT('ICRS',${this._convertRA(ra)},${dec}),
         CIRCLE('ICRS',ngvs.principleRA,ngvs.principleDec,0.00001)
       )`
    let queryURI = config.endpoints.youcat + encodeURIComponent(queryString)   
    let response = await fetch(queryURI, {credentials: 'include'})
    let csvText = await response.text()
    if (csvText.split('Official_name\n').length != 2) return null
    return csvText.split('Official_name\n')[1]
  }

  async _queryGalaxyCatalogByName(name) {
    let queryString = 
      `SELECT Official_name from cfht.ngvsCatalog
       WHERE Official_name='${name}' OR Old_name='${name}'`
    let queryURI = config.endpoints.youcat + encodeURIComponent(queryString)   
    let response = await fetch(queryURI, {credentials: 'include'})
    let csvText = await response.text()
    console.log(csvText)
    if (csvText.split('Official_name\n').length != 2) return null
    return csvText.split('Official_name\n')[1]
  }


  _createSearchMarker(queryResults) {
    let coordinates = [queryResults.dec, queryResults.ra]
    let searchMarker = L.marker(this._toLatLng(coordinates), {
      title: queryResults.target,
      icon: this._createMarkerIcon(config.searchMarkerColor)
    })
    return searchMarker
  }

  _convertRA(ra) {
    if (ra > 180) { ra = 180 - ra }
    return ra
  }

  _toLatLng(coordinates) {
    let dec = coordinates[0]
    let ra = this._convertRA(coordinates[1])
    return L.latLng([dec,ra])
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