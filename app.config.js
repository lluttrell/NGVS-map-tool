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
        'name' : 'Color (Visible)',
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
      },
      {
        'name' : 'Simulation',
        'url' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/files/vault/sgwyn/gsky/NGVS_SIM.{x}.{y}.{z}.png',
        'attribution' : 'NGVS',
        'initiallyOpen' : false,
        'exclusive' : true,
        'maxNativeZoom': 9
      },
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
    'argus' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/argus/sync?LANG=ADQL&FORMAT=csv&QUERY=',
    'vospace-directories' : 'https://www.canfar.net/storage/list/ngvs/data/NGVS/galaxies/',
    'vospace-files' : 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/files/vault/ngvs/data/NGVS/galaxies/'
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
  'filterIndependentFiles' : [
    {
      'filename' : '_mastermark.fits',
      'description' : 'master mask file, including all pixels masked in all filters'
    },
    {
      'filename' : '_cog_colors.dat',
      'description' : 'Color file produced from the curve of growth analysis, using the same mask and the same isophotal solutiom for all filters. The column are: splined sma, and u,g,r,i,z profiles (the sma spline is done on the g-band profile). If a filter is not present, the values are set to -100'
    },
    {
      'filename' : '_iso.pdf',
      'description' : 'PDF file including plots showing results of the isophotal analysis, the parametric fits, and the curve of growth analysis.'   
    }
  ],
  'filterSpecificFiles' : [
    {
      'filename' : '.fits',
      'description' : 'cutout from the NGVS Elixir_LSB, artificial skepticism combined stack. The cutout is centred on the input coordinates for the target, with size depending on the target’s size. Stacks are mosaic-ed for targets located close to a stack’s edge. In case of galaxies with saturated areas, those have been replaced with the corresponding areas from the “short” NGVS exposures'
    },
    {
      'filename' : '_sig.fits',
      'description' : 'cutout of the sigma file associated with root_f.fits'
    },
    {
      'filename' : '_psf.fits',
      'description' : 'PSF image generated at the location of the galaxy centre.'
    },
    {
      'filename' : '_mask.fits',
      'description' : 'mask file used during the isophotal fittings part of Typhon.'
    },
    {
      'filename' : '_iso_model.fits',
      'description' : 'best model representation of the galaxy, created using IRAF’s “bmodel” using the best isophotal guesses as input. The latter are listed in the file root_G.dat.final'
    },
    {
      'filename' : '_iso_residual.fits',
      'description' : 'residual images (root_f.fits - root_model.fits).The best estimate of the sky, as determined from the curve of growth analysis, is subtracted.'
    },
    {
      'filename' : '_galfit_model.fits',
      'description' : ''
    },
    {
      'filename' : '_galfit_residual.fits',
      'description' : 'residual images (root_f.fits - root_galfit_model.fits) produced by GALFIT.'
    },
    {
      'filename' : '_cog.dat',
      'description' : 'curve of growth data. The first two columns are geometric radius in arcsec, and calibrated total enclosed magnitude, with the best background estimate (determined by requiring that the curve of growth is flat between 4 and 5 effective radii) subtracted. The following columns are the output from the isophotal fitting performed using IRAF “ellipse” as part of Typhon on images manipulated specifically for the curve of growth analysis: SMA,INTENS,INT_ERR,ELLIP,ELLIP_ERR,PA,PA_ERR,X0,X0_ERR,Y0,Y0_ERR,TFLUX_E,TFLUX_C,NPIX_E,NPIX_C,A3,A3_ERR,B3,B3_ERR,A4,A4_ERR,B4,B4_ERR,NDATA,NFLAG,STOP'
    },
    {
      'filename' : '_iso.dat',
      'description' : 'add description'
    },
    {
      'filename' : '_par_model.dat',
      'description' : 'add description'
    },
    {
      'filename' : '_iso.results',
      'description' : 'add description'
    },
  ],
  'searchMarkerColors' : { // options: blue, gold, red, green, orange, yellow, violet, grey, black
    'locationOnly' : 'red',
    'nameMatch' : 'green',
    'nearbyGalaxy' : 'yellow'
  },
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