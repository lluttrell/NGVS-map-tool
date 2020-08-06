import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

/**
 * Class representing a modal (pop-up)
 */
class Modal {
  /**
   * Creates a modal
   * @param {boolean} fixedFooter If true, modal contains a fixed-footer section 
   * @param {boolean} dismissible If true, modal can be dismissed by clicking outside of modal
   */
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

  /**
   * Creates a modalContent section for modal
   */
  _createModalContent() {
    let modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')
    return modalContent
  }

    /**
   * Creates a modalFooter section for modal
   */
  _createModalFooter() {
    let modalFooter = document.createElement('div')
    modalFooter.classList.add('modal-footer')
    return modalFooter
  }

  /**
   * Sets modalContent to contain only childNode 
   * @param {HTMLElement} childNode node to set as child of modalContent
   */
  setModalContent(childNode) {
    this.modalContent.innerText = ''
    this.modalContent.appendChild(childNode)
  }

  /**
   * Adds childNode to modalContent
   * @param {HTMLElement} childNode node to set as child of modalContent
   */
  appendModalContent(childNode) {
    this.modalContent.appendChild(childNode)
  }

  /**
   * Sets modalFooter to contain only childNode 
   * @param {HTMLElement} childNode node to set as child of modalFooter
   */
  setModalFooter(childNode) {
    this.modalFooter.innerText = ''
    this.modalFooter.appendChild(childNode)
  }

  /**
   * Adds childNode to modalFooter
   * @param {HTMLElement} childNode node to set as child of modalFooter
   */
  appendModalFooter(childNode) {
    this.modalFooter.appendChild(childNode)
  }
}

export default Modal