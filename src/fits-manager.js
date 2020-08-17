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
    this.baseQuery = `SELECT time_exposure, energy_bandpassName, target_name, provenance_name, provenance_version,
       a.accessURL, target_name, productID, contentLength, publisherID
      FROM caom2.Observation as o JOIN caom2.Plane p on o.obsID=p.obsID JOIN caom2.Artifact a on a.planeID=p.planeID
      WHERE o.proposal_project='NGVS' AND o.type='OBJECT' AND a.productType='science'`
    this.currentQuery = []
    this.downloadList = []
    this.availableFilters = new Set()
    this.availableExposures = new Set()
    this.availableIndividualPipelines = new Set()
    this.availableStackedPipelines = new Set()
    this.filters = config.fitsImageCategories.filters.parameters
    this.exposures = config.fitsImageCategories.exposures.parameters
    this.individualPipelines = config.fitsImageCategories.individualPipelines.parameters
    this.stackedPipelines = config.fitsImageCategories.stackedPipelines.parameters
  }

  /**
   * Queries fits image catalogs for images containing a given point
   * @param {number[]} coordinates coordinate of selection
   */
  async getPublisherIdAtPoint(coordinates) {
    let queryString = this.baseQuery
    queryString += ` AND 1=CONTAINS(POINT('ICRS',${coordinates[1]},${coordinates[0]}), p.position_bounds)`
    this._query(queryString)
    await this._query(queryString)
  }

  /**
   * Queries fits image catalogs for images intersecting a given region 
   * @param {number[]} bottomLeftCoords bottom left coordinate of selection area
   * @param {number[]} topRightCoords top right coordinate of selection area
   */
  async getPublisherIdAtRegion(bottomLeftCoords, topRightCoords) {
    const minDec = bottomLeftCoords.lat
    const minRA = decimal_ra_formatter(bottomLeftCoords.lng,8)
    const maxDec = topRightCoords.lat
    const maxRA = decimal_ra_formatter(topRightCoords.lng,8)
    let queryString = this.baseQuery
    const regionPolygon = `POLYGON('ICRS', ${minRA}, ${minDec}, ${minRA}, ${maxDec}, ${maxRA}, ${maxDec}, ${maxRA}, ${minDec})`
    queryString += ` AND 1=INTERSECTS(${regionPolygon}, p.position_bounds)`
    await this._query(queryString)
  }

  /**
   * Filters the current query to contain only image links that are currently targeted
   * by the selection variables. Sets downloadList to contain only these links
   * @return {Array} List containing updated download 
   */
  updateDownloadList() {
    this.downloadList = this.currentQuery
      .filter(link => this.filters.includes(link.filter))
      .filter(link => this.exposures.includes(link.exposure))
      .filter((link) => {
        return this.individualPipelines.includes(link.pipeline) 
          || this.stackedPipelines.includes(link.pipeline)
      })
  }

  /**
   * Opens a download link containing urls the current download list
   */
  downloadSelectionURLList() {
    let urlString = this.downloadList.reduce((acc, li) => acc + `${li.url}\n`,'')
    let currentDate = Date.now()
    let blob = new Blob([urlString], {type:'text/plain', endings:'native'})
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download =`ngvs-urllist-${currentDate}.txt`
    link.click()
  }

  /**
   * Creates returns an html form element that will open the download manager landing page on submission
   * @param {string} formTarget target attribute for the html form
   * @return {HTMLElement} HTML Form element that to open download manager
   */
  getDownloadManagerForm(formTarget='_blank') {
    let form = document.createElement('form')
    form.method = 'post'
    form.action = config.endpoints.downloadManager
    form.target = formTarget
    for (let publisherID of this.downloadList.map(li => li.publisherID)) {
      let input = document.createElement('input')
      input.name = 'uri'
      input.value = publisherID
      form.appendChild(input)
    }
    return form
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
   * @returns {Object} Returns object containing information about a single fits image
   */
  _buildAssetObject(fitsImageData) {
    let url = fitsImageData.accessURL
    let pointing = fitsImageData.target_name
    let productID = fitsImageData.productID
    let publisherID = fitsImageData.publisherID
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
    return {filter, exposure, pipeline, url, pointing, productID, publisherID, stacked, contentLength}
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
    const queryResult = await fetch(config.endpoints.argus + encodedQuery)
    const response = await queryResult.text()
    const responseArray = Papa.parse(response, {header: true})
    responseArray.data.pop()
    for (let fitsImageData of responseArray.data) {
      this.currentQuery.push(this._buildAssetObject(fitsImageData))
    }
    this.updateDownloadList()
  }
}

export default FITSManager