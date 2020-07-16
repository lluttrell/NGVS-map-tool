import { decimal_ra_formatter } from './coordinate-formatter'
import { config } from '../app.config'
import Papa from 'papaparse'

/**
 * FITSManager is used to retrieve information about about the fits
 * images available in a given spatial region. It maintains a list 
 * of links available, as well as separate lists containing the filters,
 * exposures, and processing pipelines that are available for the current
 * query.
 * 
 * Additionally it maintains separate lists of filters, exposures, and
 * processing pipelines that are desired by the user and can be used to
 * generate a list of images for group downloading
 */
class FITSManager {
  constructor() {
    this.baseQuery = `SELECT time_exposure, energy_bandpassName, target_name, provenance_name, provenance_version, a.accessURL, target_name, productID, contentLength
      FROM caom2.Observation as o JOIN caom2.Plane p on o.obsID=p.obsID JOIN caom2.Artifact a on a.planeID=p.planeID
      WHERE o.proposal_project='NGVS' AND o.type='OBJECT' AND a.productType='science'`
    this.currentQuery = []
    this.downloadList = []
    this.availableFilters = new Set()
    this.availableExposures = new Set()
    this.availableIndividualPipelines = new Set()
    this.availableStackedPipelines = new Set()
    this.selectedFilters = config.filters
    this.selectedExposures = config.exposures
    this.selectedIndividualPipelines = config.individualPipelines
    this.selectedStackedPipelines = config.stackedPipelines
  }

  /**
   * Queries fits image catalogs for images containing a given point
   * @param {number[]} coordinates coordinate of selection
   */
  async getPublisherIdAtPoint(coordinates) {
    let queryString = this.baseQuery;
    queryString += ` AND 1=CONTAINS(POINT('ICRS',${coordinates[1]},${coordinates[0]}), p.position_bounds)`
    this._query(queryString)
    await this._query(queryString)
    return 1
  }

  /**
   * Queries fits image catalogs for images intersecting a given region 
   * @param {number[]} bottomLeftCoords bottom left coordinate of selection area
   * @param {number[]} topRightCoords top right coordinate of selection area
   */
  async getPublisherIdAtRegion(bottomLeftCoords, topRightCoords) {
    const minDec = bottomLeftCoords.lat;
    const minRA = decimal_ra_formatter(bottomLeftCoords.lng,8);
    const maxDec = topRightCoords.lat;
    const maxRA = decimal_ra_formatter(topRightCoords.lng,8);
    let queryString = this.baseQuery;
    const regionPolygon = `POLYGON('ICRS', ${minRA}, ${minDec}, ${minRA}, ${maxDec}, ${maxRA}, ${maxDec}, ${maxRA}, ${minDec})`
    queryString += ` AND 1=INTERSECTS(${regionPolygon}, p.position_bounds)`
    await this._query(queryString)
    return 1
  }

  /**
   * Filters the current query to contain only image links that are currently targeted
   * by the selection variables. Sets downloadList to contain only these links
   */
  updateDownloadList() {
    this.downloadList = this.currentQuery
      .filter(link => this.selectedFilters.includes(link.filter))
      .filter(link => this.selectedExposures.includes(link.exposure))
      .filter((link) => {
        return this.selectedIndividualPipelines.includes(link.pipeline) 
          || this.selectedStackedPipelines.includes(link.pipeline)
      })
  }

  /**
   * Opens a download link containing urls the current download list
   */
  downloadSelectionURLList() {
    let urlString = this.downloadList.reduce((acc, li) => acc + `${li.url}\n`,'')
    let currentDate = Date.now();
    let blob = new Blob([urlString], {type:'text/plain', endings:'native'});
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download =`ngvs-urllist-${currentDate}.txt`;
    link.click();
  }

  /**
   * Opens all urls in the current download list (downloads all files)
   */
  downloadSelection() {
    for (let link of this.downloadList) {
      window.open(link.url)
    }
  }

  /**
   * Returns the total size of all files in the downloadlist (in bytes)
   */
  getDownloadListSize() {
    return this.downloadList.reduce((acc, li) => acc + parseInt(li.contentLength), 0)
  }

  /**
   * Takes a single object representing a row (single fits file) of the query results
   * and determines the category that the image belongs to. Adds the category to the
   * currently available sets, and returns an object representing the category  
   * @param {Object} fitsImageData 
   */
  _buildAssetObject(fitsImageData) {
    let url = fitsImageData.accessURL
    let pointing = fitsImageData.target_name
    let productID = fitsImageData.productID
    let contentLength = fitsImageData.contentLength
    let filter = fitsImageData.energy_bandpassName.slice(0,1)
    this.availableFilters.add(filter)
    let exposure
    if (Number(fitsImageData.time_exposure) < 400) {
      exposure = 'short'
    } else {
      exposure = 'long'
    }
    this.availableExposures.add(exposure)
    let pipeline
    let stacked = false
    if (fitsImageData.provenance_name === 'MEGAPIPE') {
      pipeline = 'l128'
      stacked = true
      this.availableStackedPipelines.add('l128')
    } else if (fitsImageData.provenance_version == 2) {
      pipeline = 'elixir'
      this.availableIndividualPipelines.add(pipeline)
    } else {
      pipeline = 'raw'
      this.availableIndividualPipelines.add(pipeline)
    }
    return {filter, exposure, pipeline, url, pointing, productID, stacked, contentLength}
  }

  /**
   * Clears results of previous query and performs another query on the fits image database
   * Uses results of query to populate currentQuery with list of available images. 
   * @param {string} queryString 
   */
  async _query(queryString) {
    this.currentQuery = []
    this.availableFilters.clear()
    this.availableExposures.clear()
    this.availableIndividualPipelines.clear()
    this.availableStackedPipelines.clear()
    let encodedQuery = encodeURIComponent(queryString)
    const queryResult = await fetch(`https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/argus/sync?LANG=ADQL&QUERY=${encodedQuery}&FORMAT=csv`)
    const response = await queryResult.text();
    const responseArray = Papa.parse(response, {header: true})
    responseArray.data.pop();
    for (let fitsImageData of responseArray.data) {
      this.currentQuery.push(this._buildAssetObject(fitsImageData))
    }
    this.updateDownloadList();
    return 1;
  }
}

export default FITSManager