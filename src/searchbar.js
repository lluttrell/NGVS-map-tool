class SearchBar {
  constructor(lMap) {
    this.lMap = lMap
    this.searchString = ''
  }

  render(node) {
    let searchBar = document.createElement('div')
    searchBar.classList.add('input-field')

    let searchBoxImage = document.createElement('i')
    searchBoxImage.classList.add('material-icons')
    searchBoxImage.classList.add('prefix')
    searchBoxImage.innerText = 'search'
    searchBar.appendChild(searchBoxImage)

    let searchBoxInput = document.createElement('input')
    searchBoxInput.setAttribute('placeholder', 'Object/Location Search')
    searchBoxInput.setAttribute('type', 'search')
    searchBoxInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this._performSearch()
      } else {
        this.searchString = searchBoxInput.value
      }
    })
    searchBar.appendChild(searchBoxInput)
    
    node.appendChild(searchBar)
  }

  async _performSearch() {
    if (this.searchString === '') {
      this.lMap.clearSearchMarker()
    } else {
      try {
        let queryResults = await this._queryNameResolver()
        console.log(queryResults)
        this.lMap.setSearchMarker(queryResults.name, queryResults.coordinates)
      } catch (e) {
        M.toast({html: e.message, classes:'red lighten-2'})
      }
    }
  }

  async _queryNameResolver() {
    let response = await fetch(`https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/AdvancedSearch/unitconversion/Plane.position.bounds?term=${this.searchString}&resolver=all`)
    let resultJSON = await response.json();
    if (resultJSON.resolveStatus === "GOOD") {
      return this._parseNameResolverResults(resultJSON.resolveValue)
    } else {
      throw new Error('Search Failed')
    }
  }

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