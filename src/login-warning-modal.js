import Modal from './modal'
import './styles/login-warning-modal.css'
class LoginWarningModal extends Modal {
  constructor() {
    super(true, true)
  }

  render(node) {
    node.innerText = ''
    node.appendChild(this.modal)
    this.modal.id = 'login-warning-modal'
    this._addModalContent()
    this._addModalFooter()
    this.modalInstance.open()
  }

  _addModalContent() {
    let warningParagraph = document.createElement('p')
    warningParagraph.innerText = `You do not have access to some of the available resources. If you have a CADC account, please ensure you are logged in.`
    this.appendModalContent(warningParagraph)
    this.appendModalContent(this._createIgnoreButton())
  }

  _addModalFooter() {
    this.appendModalFooter(this._createDismissButton())
    this.appendModalFooter(this._createLoginButton())
  }

  _createIgnoreButton() {
    let ignoreButton = document.createElement('label')
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
    ignoreButton.append(input, span)
    return ignoreButton
  }

  _createDismissButton() {
    let dismissButton = document.createElement('button')
    dismissButton.classList.add('btn','red','lighten-2')
    dismissButton.innerText = 'Dismiss'
    dismissButton.addEventListener('click', () => this.modalInstance.destroy())
    return dismissButton
  }

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