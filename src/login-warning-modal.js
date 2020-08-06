class LoginWarningModal {
  constructor() {
    this.modal = document.createElement('div')
    this.modal.classList.add('modal','modal-fixed-footer')
    this.modal.id = 'login-modal'
    this.modalInstance = M.Modal.init(this.modal, { dismissible: false })

  }

  render(node) {
    node.innerText = ''
    this.modal.appendChild(this._createModalBody())
    this.modal.appendChild(this._createModalFooter())
    node.appendChild(this.modal)
    this.modalInstance.open()
  }

  _createModalBody() {
    let modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')

    let warningParagraph = document.createElement('p')
    warningParagraph.innerText = `You do not have access to some of the available resources. If you have a CADC account, please ensure you are logged in.`
    modalContent.appendChild(warningParagraph)

    modalContent.appendChild(this._createIgnoreButton())
    return modalContent
  }

  _createModalFooter() {
    let modalFooter = document.createElement('div')
    modalFooter.classList.add('modal-footer')
    modalFooter.appendChild(this._createDismissButton())
    modalFooter.appendChild(this._createLoginButton())
    return modalFooter
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