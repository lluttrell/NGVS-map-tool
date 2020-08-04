import FITSModal from './fits-modal'
import FITSManager from './fits-manager'

class FITSTab {
  constructor(mapObj, fitsmgr) {
    this.mapObj = mapObj
    this.fitsmgr = fitsmgr
  }

  render(node) {
    node.appendChild(this.createHelpParagraph())
    node.appendChild(this.createSelectAreaButton())
  }

  createHelpParagraph() {
    let paragraph = document.createElement('p')
    paragraph.innerText = 'While holding Shift, click and drag a box to display FITS Images for the region. '
    return paragraph
  }

  createSelectAreaButton() {
    let button = document.createElement('button')
    button.classList.add('btn-small')
    button.innerText = 'List Images In Current Map View'
    button.addEventListener('click', () => {
      let bounds = this.mapObj.lMap.getBounds()
      let fitsModal = new FITSModal(bounds, this.fitsmgr)
      fitsModal.render();
    })
    return button
  }
}

export default FITSTab