import help from './help.html'
import './styles/help.css'

class HelpTab {
  render(node) {
    node.innerHTML = ''
    node.appendChild(this._createHelpDiv())
  }

  _createHelpDiv() {
    let div = document.createElement('div')
    div.classList.add('help-div')
    div.innerHTML = help
    return div
  }
}

export default HelpTab