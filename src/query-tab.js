import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import CatalogQueryForm from './catalog-query-form'

class QueryTab {
  constructor(catalogList) {
    this.catalogList = catalogList
    this.catalogQueryFormDiv = document.createElement('div')
    this.catalogSelectMenu = this._createSelectMenu()
    this.currentCatalogQueryForm = null
    this.currentCatalog = null
  }

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

  _createSelectMenu() {
    let catalogSelectMenu = document.createElement('select')
    catalogSelectMenu.id = 'query-tab-select-menu'
    catalogSelectMenu.addEventListener('change', (e) => this._changeCatalog())

    let defaultSelect = document.createElement('option')
    defaultSelect.setAttribute('disabled',true)
    defaultSelect.setAttribute('selected', true)
    defaultSelect.setAttribute('value','')
    defaultSelect.innerText = 'Select Catalog';
    catalogSelectMenu.appendChild(defaultSelect)

    for (let catalog of this.catalogList) {
      let optionElement = document.createElement('option');
      optionElement.setAttribute('value', catalog.name);
      optionElement.innerHTML = catalog.name;
      catalogSelectMenu.appendChild(optionElement);
    }
    return catalogSelectMenu
  }

  _changeCatalog() {
    let selectedCatalogName = document.getElementById('query-tab-select-menu').value
    for (let catalog of this.catalogList) {
      if (catalog.name === selectedCatalogName) {
        this.currentCatalog = catalog
      }
    }
    this._refreshCatalogQueryFormDiv()
  }

  _refreshCatalogQueryFormDiv() {
    this.currentCatalogQueryForm = new CatalogQueryForm(this.currentCatalog)
    this.catalogQueryFormDiv.innerText = ''
    this.currentCatalogQueryForm.render(this.catalogQueryFormDiv)
  }

}

export default QueryTab