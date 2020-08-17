import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import CatalogQueryForm from './catalog-query-form'

/**
 * Class that renders contents of 'Query Catalog' tab for the application. Creates a select menu
 * with entries for all YouCat catalogs for the application, as well as logic to switch the currently
 * selected catalog
 */
class QueryTab {
  /**
   * Creates an instance of QueryTab
   * @param {Array} catalogList Array containing names of YouCat catalogs to create query forms for
   */
  constructor(catalogList) {
    this.catalogList = catalogList
    this.catalogQueryFormDiv = document.createElement('div')
    this.catalogSelectMenu = this._createSelectMenu()
    this.currentCatalogQueryForm = null
    this.currentCatalog = null
  }

  
  /**
   * Renders QueryTab as a child of the node element
   * @param {HTMLElement} node node to render querytab in 
   */
  render(node) {
    let queryTabDiv = document.createElement('div')
    queryTabDiv.classList.add('container')
    if (this.catalogList.length == 0) {
      queryTabDiv.innerHTML = '<div class="container"><p>There are no available catalogs</p></div>'
    } else {
      queryTabDiv.appendChild(this.catalogSelectMenu)
      queryTabDiv.appendChild(this.catalogQueryFormDiv)
    }
    node.appendChild(queryTabDiv)
  }


  /**
   * Creates an HTML select menu with entries for each catalog. Event listener swtiches value
   * of the currentCatalog based on value of select menu
   * @return {HTMLElement} HTML Select element with entries for each catalog
   */
  _createSelectMenu() {
    let catalogSelectMenu = document.createElement('select')
    catalogSelectMenu.id = 'query-tab-select-menu'
    catalogSelectMenu.addEventListener('change', (e) => this._changeCatalog())

    let defaultSelect = document.createElement('option')
    defaultSelect.setAttribute('disabled',true)
    defaultSelect.setAttribute('selected', true)
    defaultSelect.setAttribute('value','')
    defaultSelect.innerText = 'Select Catalog'
    catalogSelectMenu.appendChild(defaultSelect)

    for (let catalog of this.catalogList) {
      let optionElement = document.createElement('option')
      optionElement.setAttribute('value', catalog.name)
      optionElement.innerHTML = catalog.name
      catalogSelectMenu.appendChild(optionElement)
    }
    return catalogSelectMenu
  }


  /**
   * Changes value of currentcatalog and re-renders the query form for the catalog
   */
  _changeCatalog() {
    let selectedCatalogName = document.getElementById('query-tab-select-menu').value
    for (let catalog of this.catalogList) {
      if (catalog.name === selectedCatalogName) {
        this.currentCatalog = catalog
      }
    }
    this._refreshCatalogQueryFormDiv()
  }


  /**
   * creates a new catalog query form for the selected catalog
   * @todo Keep objects persistent and just switch objects rather than recreating
   */
  _refreshCatalogQueryFormDiv() {
    this.currentCatalogQueryForm = new CatalogQueryForm(this.currentCatalog)
    this.catalogQueryFormDiv.innerText = ''
    this.currentCatalogQueryForm.render(this.catalogQueryFormDiv)
  }

}

export default QueryTab