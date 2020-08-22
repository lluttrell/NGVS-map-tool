import * as L from 'leaflet'
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
import './styles/map.css'


/**
 * The Map object represents the actual 'map' in for the application. It contains a single instance
 * of a leaflet map, as well as other leaflet/custom objects that render on top of the map. 
 */
class Map {
  /**
   * @constructor
   * Creates an instance of Map
   */
  constructor() {
    this.fieldOutlines = new FieldOutlines()
    this.tilesetFilter = new TilesetFilter()

    // hide some stuff on mobile, just for fun
   
    this.isMobile = /Mobi/.test(navigator.userAgent)
    
    this.tileSets = config.baseTileSets
    for (let tileSet of this.tileSets) {
      tileSet['tileLayer'] = L.tileLayer.colorFilter(tileSet.url, {
        attribution: tileSet.attribution,
        filter: this.tilesetFilter.stringList,
        maxZoom: config.maxZoom,
        maxNativeZoom: tileSet.maxNativeZoom,
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

    if (this.isMobile) this.lMap.removeControl(this.lMap.zoomControl)

    this.layerControl = L.control.groupedLayers(null, null, {
      collapsed: this.isMobile,
      exclusiveGroups: ['NGVS Base Maps']
      })
  }


  /**
   * Initializes the Map object. Adds a variety of layers to the layerControl. Adds the mouse control
   * and adds the area select functionality to the map
   */
  async init() {
    await this.fieldOutlines.init()
    for (let tileSet of this.tileSets) {
      if (tileSet.exclusive) {
        this.layerControl.addOverlay(tileSet.tileLayer,tileSet.name,'NGVS Base Maps')
      } else {
        this.layerControl.addOverlay(tileSet.tileLayer,tileSet.name,'SDSS Background')
      }
    }
    this.lMap.selectArea.setShiftKey(true)
    this.lMap.createPane('pointingPane')
    this.lMap.createPane('catalogPane')
    this.lMap.createPane('searchPane')
    
    this.layerControl.addOverlay(this.fieldOutlines.getPointingLayerGroup(),'NGVS','Pointings')
    for (let filterName of config.fitsImageCategories.filters.parameters) {
      this.layerControl.addOverlay(this.fieldOutlines.getLongOutlineLayerGroup(filterName), filterName, 'Field Outlines (Long)')
      this.layerControl.addOverlay(this.fieldOutlines.getShortOutlineLayerGroup(filterName), filterName, 'Field Outlines (Short)')
    }
    this.layerControl.addTo(this.lMap)
    this._createMousePositionControl(decimal_ra_formatter, decimal_dec_formatter).addTo(this.lMap)
    this._createMousePositionControl(hms_formatter, dms_formatter).addTo(this.lMap)
    
    if (!this.isMobile) L.control.attribution({position: 'bottomleft'}).addTo(this.lMap)
  }


  /**
   * Adjusts a property for this map's tileset filter object
   * @param {string} property Filter property to adjust
   * @param {Number} value Numerical value to set it to
   */
  adjustTilesetFilter(property, value) {
    this.tilesetFilter.adjustFilterProperty(property, value)
    for (let tileSet of this.tileSets) {
      tileSet.tileLayer.updateFilter(this.tilesetFilter.stringList)
    }
  }

  /**
   * Returns a leaflet mouseposition object
   * @param {function} lngFormatter Javascript function to format leaflet longitude coordinates to RA
   * @param {function} latFormatter Javascript function to format leaflet latitude coordiates to DEC
   */
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