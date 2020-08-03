/**
 * Contains a variety of configuration properties for the app
 */

const config = {
  'baseTileSets':
    [
      {
        'name' : 'SDSS',
        'url' : 'https://mw1.google.com/mw-planetary/sky/skytiles_v1/{x}_{y}_{z}.jpg',
        'attribution' : 'Image Credit: DSS Consortium, SDSS, NASA/ESA <a href="https://www.google.com/intl/en-CA_US/help/terms_maps/">Terms of Use</a>',
        'initiallyOpen' : true
      },
      {
        'name' : 'NGVS',
        'url' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/data/pub/GSKY/M.{x}.{y}.{z}.png',
        'attribution' : 'NGVS',
        'initiallyOpen' : true
      }
    ],
  'catalogList' : ['cfht.ngvsCatalog','cfht.ngvsGCXDCatalog','cfht.ngvsStarsXDCatalog'],
  'skyTileUrl' : 'https://mw1.google.com/mw-planetary/sky/skytiles_v1/{x}_{y}_{z}.jpg',
  'ngvsTileUrl' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/data/pub/GSKY/M.{x}.{y}.{z}.png',
  'colors' : ['yellow','red','blue','orange','teal','purple','lightgreen'],
  'fieldLineStyles' : {
    'single': {
      'dashArray': '1, 4',
      'weight' : 2,
      'opacity' : 0.5
    },
    'stacked': {
      'dashArray': null,
      'weight': 3,
      'opacity' : 1.0
    },
    'pointing': {
      'dashArray': null,
      'weight': 3,
      'opacity' : 1.0
    },
  },
  'pointingOutlineColor' : 'lightgray',
  'fieldColors' : {
    'u' : 'indigo',
    'b' : 'blue',
    'v' : 'limegreen',
    'g' : 'mediumseagreen',
    'r' : 'orangered',
    'i' : 'red',
    'z' : 'darkred',
    'k' : 'dimgray'
  },
  'filters' : ['u','g','r','i','z','k'],
  'exposures' : ['short','long'],
  'individualPipelines' : ['raw', 'elixir', 'elixir-lsb'],
  'stackedPipelines' : ['l128','g002','g004'],
  'tilesetFilters' : {
    'saturation' : {
      'minValue': 0,
      'maxValue': 150,
      'defaultValue': 100
    },
    'contrast' : {
      'minValue': 0,
      'maxValue': 150,
      'defaultValue': 100
    },
    'brightness' : {
      'minValue': 0,
      'maxValue': 150,
      'defaultValue': 100
    },
  },
  'defaultMapLocation' : [10.425,-7.037387],
  'defaultZoom' : 6,
  'minZoom' : 5,
  'maxZoom' : 14,
}

export { config }