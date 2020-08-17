import Modal from './modal'
import { createLoader } from './utils/loader.js'

/**
 * Class representing a modal to display information about a single object in catalog
 * @extends Modal
 */
class ObjectDetailModal extends Modal {

  /**
   * Creates an ObjectDetailModal
   * @param {Catalog} catalog Catalog to which object belongs to
   * @param {string} objectID ID of object
   */
  constructor(catalog, objectID, fixedFooter=false) {
    super(fixedFooter, true)
    this.catalog = catalog
    this.objectID = objectID
  }

  /**
   * Replaces contents of node with rendering of ObjectDetailModal. Displays loading bar while
   * querying the Catalog for the object, then displays the results as a table in the body.
   * @param {HTMLElement} node node in which to display modal
   */
  async render(node) {
    node.innerText = ''
    node.appendChild(this.modal)
    this.setModalContent(createLoader('Retrieving selection from database'))
    this.modalInstance.open()
    await this.catalog.queryObject(this.objectID)
    this.setModalContent(this._createModalTitle())
    this.appendModalContent(this._createObjectInformationTable())
  }

  /**
   * Creates title for the modal content
   * @return {HTMLElement} HTML header element
   */
  _createModalTitle() {
    const modalTitle = document.createElement('h4')
    modalTitle.innerText = this.objectID
    return modalTitle
  }

  /**
   * Creates a table containing information about the object
   * @return {HTMLElement} HTML table element populated with information about the object
   */
  _createObjectInformationTable() {
    let table = document.createElement('table')
    table.classList.add('highlight')
    let tableHead = document.createElement('thead')
    tableHead.innerHTML = '<tr><th>Property</th><th>Value</th></tr>'
    let tableBody = document.createElement('tbody')
    for(let [key,value] of Object.entries(this.catalog.currentObjectQuery)) {
        let row = document.createElement('tr')
        let property = document.createElement('td')
        property.innerHTML = key
        let propertyValue = document.createElement('td')
        propertyValue.innerHTML = value
        row.appendChild(property)
        row.appendChild(propertyValue)
        tableBody.appendChild(row)
    }
    table.append(tableHead,tableBody)
    return table
  }

}

export default ObjectDetailModal