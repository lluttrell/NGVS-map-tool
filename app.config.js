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
        'initiallyOpen' : true,
        'exclusive' : false
      },
      {
        'name' : 'NGVS',
        'url' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/data/pub/GSKY/M.{x}.{y}.{z}.png',
        'attribution' : 'NGVS',
        'initiallyOpen' : true,
        'exclusive' : true
      },
      {
        'name' : 'u',
        'url' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/files/vault/sgwyn/gsky/U.{x}.{y}.{z}.png',
        'attribution' : 'NGVS',
        'initiallyOpen' : false,
        'exclusive' : true
      },
      {
        'name' : 'g',
        'url' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/files/vault/sgwyn/gsky/G.{x}.{y}.{z}.png',
        'attribution' : 'NGVS',
        'initiallyOpen' : false,
        'exclusive' : true
      },
      {
        'name' : 'r',
        'url' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/files/vault/sgwyn/gsky/R.{x}.{y}.{z}.png',
        'attribution' : 'NGVS',
        'initiallyOpen' : false,
        'exclusive' : true
      },
      {
        'name' : 'i',
        'url' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/files/vault/sgwyn/gsky/I.{x}.{y}.{z}.png',
        'attribution' : 'NGVS',
        'initiallyOpen' : false,
        'exclusive' : true
      },
      {
        'name' : 'z',
        'url' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/files/vault/sgwyn/gsky/Z.{x}.{y}.{z}.png',
        'attribution' : 'NGVS',
        'initiallyOpen' : false,
        'exclusive' : true
      }
    ],
  'catalogs' : [
    {
      'name' : 'cfht.ngvsCatalog',
      'markerColor' : 'yellow'
    },
    {
      'name' : 'cfht.ngvsGCXDCatalog',
      'markerColor' : 'red'
    },
    {
      'name' : 'cfht.ngvsStarsXDCatalog',
      'markerColor' : 'blue'
    }
  ],
  'catalogMarkerSize': 500,
  'endpoints' : {
    'downloadManager' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/downloadManager/download?',
    'youcat' : 'https://ws-cadc.canfar.net/youcat/sync?LANG=ADQL&FORMAT=csv&QUERY=',
    'argus' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/argus/sync?LANG=ADQL&FORMAT=csv&QUERY='

  },
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
  'searchMarkerColor' : 'orange', // options: blue, gold, red, green, orange, yellow, violet, grey, black
  'searchHistoryLength' : 100,
  'pointingOutlineColor' : 'gray',
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
  'fitsImageCategories': {
    'filters' : {
      'title' : 'Filters',  
      'parameters' : ['u','g','r','i','z','k'],
    },
    'exposures' : {
      'title' : 'Filters',
      'parameters' : ['short','long']
    },
    'individualPipelines' : {
      'title' : 'Single Images',
      'parameters' : ['raw', 'elixir', 'elixir-lsb']
    },
    'stackedPipelines' : {
      'title' : 'Stacked Images',
      'parameters' : ['l128','g002','g004']
    }
  },
  'tilesetFilters' : {
    'saturation' : {
      'minValue': 0,
      'maxValue': 200,
      'defaultValue': 100
    },
    'contrast' : {
      'minValue': 0,
      'maxValue': 200,
      'defaultValue': 100
    },
    'brightness' : {
      'minValue': 0,
      'maxValue': 200,
      'defaultValue': 100
    },
  },
  'defaultMapLocation' : [10.425,-7.037387],
  'defaultZoom' : 6,
  'minZoom' : 5,
  'maxZoom' : 14,
}

export { config }