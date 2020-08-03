import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-mouse-position'
import 'leaflet-groupedlayercontrol'
import 'leaflet.tilelayer.colorfilter'
import SelectArea from 'leaflet-area-select'
import './styles/main.css'
import { config } from '../app.config'
import Catalog from './catalog'
import Map from './map'
import SearchBar from './searchbar'
import QueryTab from './query-tab'
import FITSManager from './fits-manager'
import FITSModal from './fits-modal'
import AdjustTab from './adjust-tab'

class App {
    constructor() {
        this.catalogList = []
        this.currentCatalog = null
        this.mapObj = new Map();
        this.fitsmgr = new FITSManager();
        this.sidebar = document.getElementById('nav-mobile')
    }

    async init() {
        // display a loading bar initially
        let pageLoadingBar = document.createElement('div')
        pageLoadingBar.classList.add('progress', 'container')
        pageLoadingBar.innerHTML = '<div class="indeterminate"></div>'
        this.sidebar.appendChild(pageLoadingBar)
        
        this.mapObj.init();
        this.mapObj.lMap.on('areaselected', (e) => {
            let fitsModal = new FITSModal(e.bounds, this.fitsmgr)
            fitsModal.render()
        })

        for (let [catalogName, color] of config.catalogList.map((e, i) => [e, config.colors[i]])) {
            try {
                let catalog = new Catalog(catalogName, color, this.mapObj);
                await catalog.init();
                this.catalogList.push(catalog)
            } catch(e) {
                M.toast({html: `Failed to load ${catalogName}: Permission Denied`, classes:'red lighten-2'})
            }
        }
        
        const searchBar = new SearchBar(this.mapObj)
        searchBar.render(document.getElementById('search'))

        const queryTab = new QueryTab(this.catalogList)
        queryTab.render(document.getElementById('query-tab-body'))

        const adjustTab = new AdjustTab(this.mapObj)
        adjustTab.render(document.getElementById('adjustment-tab-body'))

        // fix to add colors to collapsible list
        let collapsibleHeaders = document.getElementsByClassName('collapsible-header')
        for (let element of collapsibleHeaders) {
            element.addEventListener('click', () => {
                if (element.classList.contains('red','lighten-4')) {
                    element.classList.remove('red','lighten-4')
                    // element.parentElement.classList.remove('open')
                } else {
                    element.classList.add('red','lighten-4')
                    // element.parentElement.classList.add('open')
                }
            })
        }

        // show collapsible list only after their contents are availible and remove loader
        document.getElementById('collapsible-list').classList.remove('hidden')
        this.sidebar.removeChild(pageLoadingBar)
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const appModel = new App()
    await appModel.init();
    M.Collapsible.init(document.querySelectorAll('.collapsible'), {accordion: false});
    M.Tabs.init(document.getElementById('query-tab'))
    M.Sidenav.init(document.querySelectorAll('.sidenav'))
    M.FormSelect.init(document.querySelectorAll('select'))
});

