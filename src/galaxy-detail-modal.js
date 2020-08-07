import ObjectDetailModal from './object-detail-modal'
import { createLoader } from './utils/loader.js'

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

  _showOverview() {
    this.setModalContent(this._createModalTitle())
    this.appendModalContent(this._createObjectInformationTable())
    this.setModalFooter(this._createViewDownloadButton())
  }

  _showDownloads() {
    this.setModalContent(this._createModalTitle())
    this.setModalFooter(this._createGoBackButton())
  }

  _createViewDownloadButton() {
    let button = document.createElement('button')
    button.classList.add('btn')
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