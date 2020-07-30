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

const root = document.getElementsByTagName('html')[0]


const createTileAdjustmentSliders = (parameter, minValue, maxValue) => {
    let slider = document.createElement('p')
    slider.classList.add('range-field')
    let input = document.createElement('input')
    input.setAttribute('type','range')
    input.id = parameter
    input.setAttribute('min',minValue)
    input.setAttribute('max',maxValue)
    input.addEventListener('input',(e) => {
        NGVS_TILE_TILESET.updateFilter([`${e.target.id}:${e.target.value}%`])
    })
    let label = document.createElement('label')
    label.setAttribute('for', parameter)
    label.innerText = parameter
    slider.appendChild(input)
    slider.appendChild(label)
    return slider
}


const initAdjustmentTabBody = () => {
    let adjustmentTabBody = document.getElementById('adjustment-tab-body')
    for (let prop of ['contrast','saturation','brightness']) {
        let slider = createTileAdjustmentSliders(prop, 0, 100)
        adjustmentTabBody.appendChild(slider)
    }
}

class App {
    constructor() {
        this.catalogList = []
        this.currentCatalog = null
        this.mapObj = new Map();
        this.fitsmgr = new FITSManager();
    }

    async init() {
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
    }
}

document.addEventListener('DOMContentLoaded', async function() {

    root.classList.add('in-progress')
    const appModel = new App()
    await appModel.init();
    M.Collapsible.init(document.querySelectorAll('.collapsible'), {accordion: false});
    M.Tabs.init(document.getElementById('query-tab'));
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    root.classList.remove('in-progress')
});

