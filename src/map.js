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


class Map {
  constructor() {
    this.tilesetFilter = []
    this.fieldOutlines = new FieldOutlines();
    this.SDSSTileLayer = L.tileLayer.colorFilter(config.skyTileUrl, {
      attribution: 'SDSS Attribution',
      filter: this.tilesetFilter
    })
    this.NGVSTileLayer = L.tileLayer.colorFilter(config.ngvsTileUrl, {
      attribution: 'NGVS Attribution',
      filter: this.tilesetFilter
    })

    this.lMap = L.map('map-container', {
      center: config.defaultMapLocation,
      zoom: config.defaultZoom,
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      selectArea: true,
      layers: [this.SDSSTileLayer, this.NGVSTileLayer],
      preferCanvas: true,
      attributionControl: false
    })

    this.searchMarker = L.marker([0,0], {
      "opacity" : 0.0,
      "icon": this._createMarkerIcon('yellow')
    })

    this.layerControl = L.control.groupedLayers(null, null, {collapsed: false})
  }

  init() {
    this.searchMarker.addTo(this.lMap)
    this.layerControl.addOverlay(this.SDSSTileLayer,'SDSS','Base Maps')
    this.layerControl.addOverlay(this.NGVSTileLayer,'NGVS','Base Maps')
    this.layerControl.addOverlay(this.fieldOutlines.getPointingLayerGroup(),'NGVS','Pointings')
    for (let filterName of config.filters) {
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


  setSearchMarker(name, coordinates) {
    this.searchMarker.setLatLng(this._toLatLng(coordinates));
    this.searchMarker.bindTooltip(`${name}`)
    this.searchMarker.setOpacity(1.0);
  }


  clearSearchMarker() {
    this.searchMarker.setOpacity(0.0);
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


  _toLatLng(coordinates) {
    let dec = coordinates[0]
    let ra = coordinates[1];
    if (ra > 180) { ra = 180 - ra};
    return L.latLng([dec,ra]);
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

export default Map