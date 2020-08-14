import help from './assets/help.html'
import './styles/help.css'

/**
 * Class that renders the contents of the Help Tab. Only really included so it works the same way
 * as the other 'Tabs'. All it does is render a static html file inside a div.
 */
class HelpTab {
  /**
   * Replaces contents of node with rendering of HelpTab
   * @param {HTMLElement} node node to render content in 
   */
  render(node) {
    node.innerHTML = ''
    node.appendChild(this._createHelpDiv())
  }

  /**
   * Creates a div populated with the html in help.html
   */
  _createHelpDiv() {
    let div = document.createElement('div')
    div.classList.add('help-div')
    div.innerHTML = help
    return div
  }
}

export default HelpTab