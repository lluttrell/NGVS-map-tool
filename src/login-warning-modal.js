import Modal from './modal'
import './styles/login-warning-modal.css'
/**
 * Class representing a modal that prompts user to login to CADC
 * @extends Modal
 */
class LoginWarningModal extends Modal {

  /**
   * Creates a LoginWarningModal
   */
  constructor() {
    super(true, true)
  }

  /**
   * Replaces contents of node with rendering of ObjectDetailModal
   * @param {HTMLElement} node node in which to display modal
   */
  render(node) {
    node.innerText = ''
    node.appendChild(this.modal)
    this.modal.id = 'login-warning-modal'
    this._addModalContent()
    this._addModalFooter()
    this.modalInstance.open()
  }

  /**
   * Adds warning message and ignore button to the modalContent 
   */
  _addModalContent() {
    let warningParagraph = document.createElement('p')
    warningParagraph.innerText = `You do not have access to some of the available resources. If you have a CADC account, please ensure you are logged in.`
    this.appendModalContent(warningParagraph)
    this.appendModalContent(this._createIgnoreLabel())
  }

  /**
   * Adds redirect and dismiss button to the modalFooter
   */
  _addModalFooter() {
    this.appendModalFooter(this._createDismissButton())
    this.appendModalFooter(this._createLoginButton())
  }

  /**
   * Creates an ignore checkbox and message. Toggles the ignoreItem property in local storage
   * @return {HTMLElement} HTML label element with a checkbox and message
   */
  _createIgnoreLabel() {
    let ignoreLabel = document.createElement('label')
    let input = document.createElement('input')
    input.setAttribute('type','checkbox')
    input.addEventListener('change', (e) => {
      if (e.target.checked) {
        localStorage.setItem('ignoreLogin', 'true')
      } else {
        localStorage.removeItem('ignoreLogin')
      }
    })
    
    let span = document.createElement('span')
    span.innerText = 'Do not show this message again'
    ignoreLabel.append(input, span)
    return ignoreLabel
  }

  /**
   * Creates a button that destroys the modal instance
   * @return {HTMLElement} HTML button element
   */
  _createDismissButton() {
    let dismissButton = document.createElement('button')
    dismissButton.classList.add('btn','red','lighten-2')
    dismissButton.innerText = 'Dismiss'
    dismissButton.addEventListener('click', () => this.modalInstance.destroy())
    return dismissButton
  }

    /**
   * Creates a button that redirects users to the CADC login page
   * @return {HTMLElement} HTML anchor element with link to CADC page
   */
  _createLoginButton() {
    let loginButton = document.createElement('a')
    let currentURL = encodeURIComponent(window.location)
    let loginURL = `http://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/login.html?target=${currentURL}`
    loginButton.setAttribute('href',loginURL)
    loginButton.classList.add('btn')
    loginButton.innerText = 'Go to CADC Login'
    loginButton.addEventListener('click', () => this.modalInstance.destroy())
    return loginButton
  }
}

export default LoginWarningModal