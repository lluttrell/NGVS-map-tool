import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

class Modal {
  constructor(fixedFooter, dismissible) {
    this.modal = document.createElement('div')
    this.modal.classList.add('modal')
    this.modalContent = this._createModalContent()
    this.modal.appendChild(this.modalContent)
    if (fixedFooter) {
      this.modal.classList.add('modal-fixed-footer')
      this.modalFooter = this._createModalFooter()
      this.modal.appendChild(this.modalFooter)
    }
    this.modalInstance = M.Modal.init(this.modal, { dismissible: dismissible })
  }

  _createModalContent() {
    let modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')
    return modalContent
  }

  _createModalFooter() {
    let modalFooter = document.createElement('div')
    modalFooter.classList.add('modal-footer')
    return modalFooter
  }

  setModalContent(childNode) {
    this.modalContent.innerText = ''
    this.modalContent.appendChild(childNode)
  }

  appendModalContent(childNode) {
    this.modalContent.appendChild(childNode)
  }

  setModalFooter(childNode) {
    this.modalFooter.innerText = ''
    this.modalFooter.appendChild(childNode)
  }

  appendModalFooter(childNode) {
    this.modalFooter.appendChild(childNode)
  }
}

export default Modal