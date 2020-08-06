import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import { createLoader } from './utils/loader.js'

class ObjectDetailModal {
  constructor(catalog, objectID) {
    this.catalog = catalog
    this.objectID = objectID
    this.modal = document.createElement('div')
    this.modalInstance = M.Modal.init(this.modal)
  }

  render(node) {
    node.innerText = ''
    createLoader('Retrieving selection from database')
  }

  _createModalBody() {
    let modalBody = document.createElement('div')
    modalBody.classList.add('modal-content')
    return modalBody
  }

  _createModalFooter() {
    let modalFooter = document.createElement('div')
    modalFooter.classList.add('modal-footer')
    return modalFooter
  }

  // node.innerText = ''
  // this.modal.appendChild(this._createModalBody())
  // this.modal.appendChild(this._createModalFooter())
  // node.appendChild(this.modal)
  // this.modalInstance.open()
}

export default ObjectDetailModal