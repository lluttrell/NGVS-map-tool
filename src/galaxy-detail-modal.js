import ObjectDetailModal from './object-detail-modal'
import { createLoader } from './utils/loader.js'
import { config } from '../app.config'
import './styles/galaxy-detail-modal.css'

class GalaxyDetailModal extends ObjectDetailModal {
  constructor(catalog, objectID) {
    super(catalog, objectID, true)
  }

  /**
   * Replaces contents of node with rendering of GalaxyDetailModal. Displays loading bar while
   * querying the Catalog for the object, then displays the results as a table in the body.
   * @param {HTMLElement} node node in which to display modal
   */
  async render(node) {
    node.innerText = ''
    node.appendChild(this.modal)
    this.setModalContent(createLoader('Retrieving selection from database'))
    this.modalInstance.open()
    await this.catalog.queryObject(this.objectID)
    this._showOverview()

  }

  async _showOverview() {
    this.setModalContent(this._createModalTitle())
    this.appendModalContent(this._createObjectInformationTable())
    let downloadsExist =  await this._checkDirectory()
    this.setModalFooter(this._createViewDownloadButton(downloadsExist))
  }

  _showDownloads() {
    this.setModalContent(this._createModalTitle())
    this._openVOSpace()
    this.setModalFooter(this._createGoBackButton())
  }

  _openVOSpace() {
    let iframe = document.createElement('iframe')
    iframe.name = 'vospace-iframe'
    iframe.id = 'vospace-iframe'
    this.appendModalContent(iframe)
    window.open(config.endpoints['vospace-directories'] + this.objectID,'vospace-iframe')
  }

  _getIframeLinks() {
    let iframe = document.getElementById('vospace-iframe').contents()
    console.log(iframe)
  }

  async _checkDirectory() {
    let directoryURI = encodeURI(config.endpoints['vospace-directories'] + this.objectID)
    let response = await fetch(directoryURI, {
      method: 'HEAD',
      mode: 'cors',
      credentials: 'include'
    })
    return response.ok
  }



  _getDownloadTable() {
    let filters = config.fitsImageCategories.filters.parameters.map(filter => filter.toUpperCase())
    let filenames = []
    for (let filterSpecificFile of config.filterSpecificFiles) {
      for (let filter of filters) {
        filenames.push(filter+filterSpecificFile.filename)
      }
    }
    filenames.forEach(filename => this._checkFile(filename))
  }

  /**
   * @todo this doesn't work. just opening page in iframe for now
   * @param {*} filename 
   */
  async _checkFile(filename) {
    let filenameURI = encodeURI(`${config.endpoints['vospace-files']}${this.objectID}/${this.objectID}_${filename}`)
    let reponse = await fetch(filenameURI, {
      method: 'HEAD',
      mode: 'cors',
      credentials: 'include'
    })
    console.log(fileURI)
    // console.log(filename + ' : ' +reponse.status)
  }

  _createViewDownloadButton(enabled) {
    let button = document.createElement('button')
    button.classList.add('btn')
    if (!enabled) button.classList.add('disabled')
    button.addEventListener('click', () => this._showDownloads())
    button.innerText = 'View Downloads'
    return button
  }

  _createGoBackButton() {
    let button = document.createElement('button')
    button.classList.add('btn','red','lighten-2')
    button.addEventListener('click', () => this._showOverview())
    button.innerText = 'Go Back'
    return button
  }

}

export default GalaxyDetailModal