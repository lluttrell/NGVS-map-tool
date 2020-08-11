import './styles/searchbar.css'

/**
 * This class is used to render a search bar that allows a user to search
 * for object names or coordinates, and plots the results as a marker on a leaflet
 * map instance. It queries the cadc name resolving service to parse object names or
 * coordinate pairs in a reasonable format into a location that can be plotted.
 */
class SearchBar {
  constructor(lMap) {
    this.lMap = lMap
    this.searchString = ''
  }

  /**
   * Renders searchbar inside a node element in the DOM
   * @param {HTMLElement} node Node to which append searchbar to
   */
  render(node) {
    let searchBar = document.createElement('div')
    searchBar.classList.add('input-field','col','s10')

    let searchBoxInput = document.createElement('input')
    searchBoxInput.id = 'searchbox-input'
    searchBoxInput.setAttribute('placeholder', 'Location Search')
    searchBoxInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this._performSearch()
        searchBoxInput.value = ''
      } else {
        this.searchString = searchBoxInput.value
      }
    })
    searchBar.appendChild(searchBoxInput)
    
    let searchBoxImage = document.createElement('i')
    searchBoxImage.classList.add('material-icons','prefix')
    searchBoxImage.innerText = 'add_location_alt'
    searchBar.addEventListener('click', () => {
      this._performSearch()
      searchBoxInput.value = ''
    })
    searchBar.appendChild(searchBoxImage)
    
    node.appendChild(searchBar)
  }

  /**
  * Method used when user searches for an object. If a search is succesful it updates
  * the searchMarker in the map object. Otherwise notifies the user with a toast. 
  */
  async _performSearch() {
    if (this.searchString === '') {
      this.lMap.clearSearchMarker()
    } else {
      try {
        let queryResults = await this._queryNameResolver()
        this.lMap.setSearchMarker(queryResults.name, queryResults.coordinates)
      } catch (e) {
        M.toast({html: e.message, classes:'red lighten-2'})
      }
    }
  }

  /**
   * Queries the cadc name resolver service, if a result is returned from the api
   * returns an object containing the name and coordinates of the search results
   */
  async _queryNameResolver() {
    let response = await fetch(`https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/AdvancedSearch/unitconversion/Plane.position.bounds?term=${this.searchString}&resolver=all`)
    let resultJSON = await response.json();
    if (resultJSON.resolveStatus === "GOOD") {
      return this._parseNameResolverResults(resultJSON.resolveValue)
    } else {
      throw new Error('Search Failed')
    }
  }

  /**
   * Parses the resolveValue from the cadc name resolver into an object containing
   * the name and coordinates of the resolveValue
   * @param {string} resolveValue 
   */
  _parseNameResolverResults(resolveValue) {
    const resolveValues = resolveValue.split('\n');
    let targetName = resolveValues[0].split(':')[1]
    let targetDec = parseFloat(resolveValues[1].split(':')[1])
    let targetRA = parseFloat(resolveValues[2].split(':')[1])
    return {
      name: targetName,
      coordinates: [targetDec, targetRA]
    }
  }
}

export default SearchBar