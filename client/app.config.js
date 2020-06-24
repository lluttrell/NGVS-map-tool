/**
 * Contains a variety of configuration properties for the app
 */

const config = {
  'catalogList' : ['cfht.ngvsCatalog','cfht.ngvsGCXDCatalog','cfht.ngvsStarsXDCatalog'],
  'skyTileUrl' : 'https://mw1.google.com/mw-planetary/sky/skytiles_v1/{x}_{y}_{z}.jpg',
  'ngvsTileUrl' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/data/pub/GSKY/M.{x}.{y}.{z}.png',
  'colors' : ['yellow','red','blue','orange','teal','purple','lightgreen'],
  'defaultMapLocation' : [10.425,-7.037387],
  'defaultZoom' : 6,
  'minZoom' : 5,
  'maxZoom' : 14,
}

export { config }