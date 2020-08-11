import 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-mouse-position'
import 'leaflet-mouse-position/src/L.Control.MousePosition.css'
import 'leaflet-groupedlayercontrol'
import 'leaflet.tilelayer.colorfilter'
import SelectArea from 'leaflet-area-select'
import { config } from '../app.config'
import { hms_formatter, dms_formatter, decimal_dec_formatter, decimal_ra_formatter } from './coordinate-formatter'
import FieldOutlines from './field-outlines'
import TilesetFilter from './tileset-filter'


class Map {
  constructor() {
    this.fieldOutlines = new FieldOutlines();
    this.tilesetFilter = new TilesetFilter();
    
    this.tileSets = config.baseTileSets
    for (let tileSet of this.tileSets) {
      tileSet['tileLayer'] = L.tileLayer.colorFilter(tileSet.url, {
        attribution: tileSet.attribution,
        filter: this.tilesetFilter.stringList
      })
    }

    this.lMap = L.map('map-container', {
      center: config.defaultMapLocation,
      zoom: config.defaultZoom,
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      selectArea: true,
      layers: this.tileSets
        .filter(t => t.initiallyOpen)
        .map(t => t.tileLayer),
      preferCanvas: true,
      attributionControl: false
    })

    this.layerControl = L.control.groupedLayers(null, null, {collapsed: false})
  }

  
  init() {
    for (let tileSet of this.tileSets) {
      this.layerControl.addOverlay(tileSet.tileLayer,tileSet.name,'Base Maps')
    }
    this.lMap.selectArea.setShiftKey(true)
    this.lMap.createPane('pointingPane')
    this.lMap.createPane('catalogPane')
    
    this.layerControl.addOverlay(this.fieldOutlines.getPointingLayerGroup(),'NGVS','Pointings')
    for (let filterName of config.fitsImageCategories.filters.parameters) {
      this.layerControl.addOverlay(this.fieldOutlines.getLongOutlineLayerGroup(filterName), filterName, 'Field Outlines (Long)')
      this.layerControl.addOverlay(this.fieldOutlines.getShortOutlineLayerGroup(filterName), filterName, 'Field Outlines (Short)')
    }
    this.layerControl.addTo(this.lMap)
    this._createMousePositionControl(decimal_ra_formatter, decimal_dec_formatter).addTo(this.lMap)
    this._createMousePositionControl(hms_formatter, dms_formatter).addTo(this.lMap)
    
    L.control.attribution({
      position: 'bottomleft'
    }).addTo(this.lMap);

  }


  adjustTilesetFilter(property, value) {
    this.tilesetFilter.adjustFilterProperty(property, value)
    for (let tileSet of this.tileSets) {
      tileSet.tileLayer.updateFilter(this.tilesetFilter.stringList)
    }
  }


  _createMousePositionControl(lngFormatter, latFormatter) {
    return L.control.mousePosition({
      position: 'bottomright',
      separator: ' | ',
      lngFormatter: lngFormatter,
      latFormatter: latFormatter,
      lngFirst: true
    })
  }

}

export default Map