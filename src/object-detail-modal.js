import Modal from './modal'
import { createLoader } from './utils/loader.js'

class ObjectDetailModal extends Modal {
  constructor(catalog, objectID) {
    super(true, false)
    this.catalog = catalog
    this.objectID = objectID
  }

  async render(node) {
    node.innerText = ''
    node.appendChild(this.modal)
    this.setModalContent(createLoader('Retrieving selection from database'))
    this.modalInstance.open()
    await this.catalog.queryObject(this.objectID)
    this.setModalContent(this._createModalTitle())
    this.appendModalContent(this._createObjectInformationTable())
  }

  _createModalTitle() {
    const modalTitle = document.createElement('h4')
    modalTitle.innerText = this.objectID
    return modalTitle
  }

  _createObjectInformationTable() {
    let table = document.createElement('table')
    table.classList.add('highlight')
    let tableHead = document.createElement('thead')
    tableHead.innerHTML = '<tr><th>Property</th><th>Value</th></tr>'
    let tableBody = document.createElement('tbody')
    for(let [key,value] of Object.entries(this.catalog.currentObjectQuery)) {
        let row = document.createElement('tr');
        let property = document.createElement('td');
        property.innerHTML = key;
        let propertyValue = document.createElement('td');
        propertyValue.innerHTML = value;
        row.appendChild(property);
        row.appendChild(propertyValue);
        tableBody.appendChild(row);
    }
    table.append(tableHead,tableBody)
    return table
  }

}

export default ObjectDetailModal