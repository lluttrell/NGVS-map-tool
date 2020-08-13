import FITSModal from './fits-modal'

/**
 * Class to render the contents of the FITS Images tab. Contains information
 * about how to retreive FITS images as well as a button to display all FITS image
 * in the current field of view for the map object
 */
class FITSTab {

  /**
   * Creates a new FITSTab object
   * @param {Map} mapObj Map object to retrieve view bounds from 
   * @param {FITSManager} fitsmgr FITSManager for the App 
   */
  constructor(mapObj, fitsmgr) {
    this.mapObj = mapObj
    this.fitsmgr = fitsmgr
  }

  /**
   * Renders FITSTab in an HTMLElement node
   * @param {HTMLElement} node node in which to render the FITSTab 
   */
  render(node) {
    node.appendChild(this.createHelpParagraph())
    node.appendChild(this.createSelectAreaButton())
  }

  /**
   * Creates a small paragraph explaining how to retrieve FITS images
   * @return {HTMLElement} HTML Paragraph element with help text
   */
  createHelpParagraph() {
    let paragraph = document.createElement('p')
    paragraph.innerText = 'While holding Shift, click and drag a box to display FITS Images for the region. '
    return paragraph
  }

  /**
   * Creates a button that triggers a FITSModal for the bounds established
   * by the current view in the leaflet map
   * @return {HTMLElement} Button to trigger modal popup
   */
  createSelectAreaButton() {
    let button = document.createElement('button')
    button.classList.add('btn-small')
    button.innerText = 'List Images In Current Map View'
    button.addEventListener('click', () => {
      let bounds = this.mapObj.lMap.getBounds()
      let fitsModal = new FITSModal(bounds, this.fitsmgr)
      fitsModal.render(document.getElementById('modal-container'));
    })
    return button
  }
}

export default FITSTab