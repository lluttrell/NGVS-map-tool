import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './styles/main.css'
import { config } from '../app.config'
import Catalog from './catalog'
import Map from './map'
import SearchBar from './searchbar'
import QueryTab from './query-tab'
import FITSManager from './fits-manager'
import FITSModal from './fits-modal'
import AdjustTab from './adjust-tab'
import FITSTab from './fits-tab'
import LoginWarningModal from './login-warning-modal'
import HelpTab from './help-tab'

/**
 * App class represents the NGVS Map tool. 
 */
class App {
  /**
   * Creates an instance of App.
   */
  constructor() {
    this.catalogList = []
    this.currentCatalog = null
    this.mapObj = new Map()
    this.fitsmgr = new FITSManager()
    this.sidebar = document.getElementById('nav-mobile')
    this.permissionDeniedErrors = []
  }

  /**
   * Creates objects for all components of the application and renders them in the DOM
   */
  async init() {
    // display a loading bar initially
    let pageLoadingBar = document.createElement('div')
    pageLoadingBar.classList.add('progress', 'container')
    pageLoadingBar.innerHTML = '<div class="indeterminate"></div>'
    this.sidebar.appendChild(pageLoadingBar)
    
    // create and initialize map object
    this.mapObj.init()
    this.mapObj.lMap.on('areaselected', (e) => {
      let fitsModal = new FITSModal(e.bounds, this.fitsmgr)
      fitsModal.render(document.getElementById('modal-container'))
    })

    let permissionDeniedErrors = await this._initCatalogs()

    if (permissionDeniedErrors.length && !localStorage.getItem('ignoreLogin')) {
      let loginWarningModal = new LoginWarningModal()
      loginWarningModal.render(document.getElementById('modal-container'))
    } else if (permissionDeniedErrors.length) {
      let errorMessage = permissionDeniedErrors.reduce((acc, val) => acc + val + '<br>','')
      M.toast({
        html: errorMessage,
        classes:'red lighten-2',
        displayLength: 8000
      })
    }
    
    const searchBar = new SearchBar(this.mapObj)
    searchBar.render(document.getElementById('search'))

    const queryTab = new QueryTab(this.catalogList)
    queryTab.render(document.getElementById('query-tab-body'))

    const adjustTab = new AdjustTab(this.mapObj)
    adjustTab.render(document.getElementById('adjustment-tab-body'))

    const fitsTab = new FITSTab(this.mapObj, this.fitsmgr)
    fitsTab.render(document.getElementById('fits-tab-body'))

    const helpTab = new HelpTab()
    helpTab.render(document.getElementById('help-tab-body'))

    // fix to add colors to collapsible list
    let collapsibleHeaders = document.getElementsByClassName('collapsible-header')
    for (let element of collapsibleHeaders) {
      element.addEventListener('click', () => {
        if (element.classList.contains('red','lighten-2')) {
          element.classList.remove('red','lighten-2')
        } else {
          element.classList.add('red','lighten-2')
        }
      })
    }

    // show collapsible list only after their contents are availible and remove loader
    document.getElementById('collapsible-list').classList.remove('hidden')
    this.sidebar.removeChild(pageLoadingBar)
    
    // initialize Materialize Components
    M.Collapsible.init(document.querySelectorAll('.collapsible'), {accordion: false})
    M.Tabs.init(document.getElementById('query-tab'))
    M.Sidenav.init(document.querySelectorAll('.sidenav'))
    M.FormSelect.init(document.querySelectorAll('select'))
  }

  /**
   * Creates and initializes new Catalog objects for all YouCat catalogs listed in the configuration file.
   * Returns a list of initialization errors (usually permissionDenied) 
   */
  async _initCatalogs() {
    let permissionDeniedErrors = []
    // initialize the catalogs in parallel
    await Promise.allSettled(config.catalogs.map(async (catalog) => {
      try {
        let catObj = new Catalog(catalog.name, catalog.markerColor, this.mapObj)
        await catObj.init()
        this.catalogList.push(catObj)
      } catch (e) {
        permissionDeniedErrors.push(e.message)
      }
    }))
    return permissionDeniedErrors
  }
}

export default App