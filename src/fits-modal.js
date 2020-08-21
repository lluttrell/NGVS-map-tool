import { config } from '../app.config'
import { createLoader } from './utils/loader.js'
import Modal from './modal'
import 'leaflet'
import './styles/fits-modal.css'


/**
 * FITS Modal is a class that renders a modal displaying an interactive list of fits images available
 * for a given spatial region.
 */
class FITSModal extends Modal {
  /**
   * Creates an instance of FITSModal
   * @param {L.Bounds} areaBounds Leaflet Bounds object representing region selected by user
   * @param {FITSManager} fitsmgr FITSManager used for querying and remembering user input state
   */
  constructor(areaBounds, fitsmgr) {
    super(true, true)
    this.fitsmgr = fitsmgr
    this.bottomLeftCoordinate = areaBounds.getSouthWest()
    this.topRightCoordinate = areaBounds.getNorthEast()
    this.availableImageDiv = document.createElement('div')
  }
  

  /**
   * Replaces contents of node with rendering of FITSModal
   * @param {HTMLElement} node node to render FITSModal in
   */
  async render(node) {
    node.innerText = ''
    node.appendChild(this.modal)
    this.setModalContent(createLoader('Retrieving available FITS Images'))
    this.modalInstance.open()
    await this.fitsmgr.getPublisherIdAtRegion(this.bottomLeftCoordinate, this.topRightCoordinate)
    this._renderMainModalContent()
  }


  /**
   * Displays rendering of 'main' modal page in the modalContent and modalFooter elements.
   */
  _renderMainModalContent() {
    this.modalContent.innerHTML = ''
    let modalTitle = document.createElement('h4')
    modalTitle.innerHTML = 'FITS Image Selection'
    this.modalContent.appendChild(modalTitle)
    for (let [key, value] of Object.entries(config.fitsImageCategories)) {
      this.appendModalContent(this._createSelectionCheckboxes(key, value))
    }
    this.availableImageDiv = this._createFITSSelectionOverview()
    this.appendModalContent(this.availableImageDiv)
    this.setModalFooter(this._createDownloadButton())
  }


  /**
   * Creates a div containting a list of checkboxes for each selection category
   * @returns {HTMLElement} HTMLDivElement containing list of checkboxes to select fits image parameters
   */
  _createSelectionCheckboxes(selectionCategory, categoryInfo ) {
    let selectionCheckboxDiv = document.createElement('div')
    let divTitle = document.createElement('h6')
    divTitle.innerText = categoryInfo.title
    selectionCheckboxDiv.appendChild(divTitle)
    for (let parameter of categoryInfo.parameters) {
      selectionCheckboxDiv.appendChild(this._createSelectionCheckbox(selectionCategory, parameter))
    }
    return selectionCheckboxDiv
  }


  /**
   * Creates an individual checkbox for a single parameter in a given category. Checkbox adds or removes
   * parameter from the selectionCategory list in the FITSManager accociated with this FITSModal. 
   * @param {string} selectionCategory name of selection category. eg. 'exposures'
   * @param {string} parameter name of parameter. eg. 'short'
   */
  _createSelectionCheckbox(selectionCategory, parameter) {
    let label = document.createElement('label')
    label.classList.add('fits-selection-label')
    let checkbox = document.createElement('input')
    checkbox.setAttribute('type','checkbox')
    checkbox.classList.add('filled-in')
    if (!this.fitsmgr['available' + selectionCategory[0].toUpperCase() + selectionCategory.slice(1)].has(parameter)) checkbox.setAttribute('disabled','disabled')
    if (this.fitsmgr[selectionCategory].includes(parameter)) checkbox.setAttribute('checked','checked')
    checkbox.addEventListener('change', (e) => {
      if (!e.target.checked) {
        this.fitsmgr[selectionCategory] = this.fitsmgr[selectionCategory].filter(f => f != parameter)
      } else {
        this.fitsmgr[selectionCategory].push(parameter)
      }
      this._refreshModalContent()
    })
    label.appendChild(checkbox)
    let name = document.createElement('span')
    name.innerText = parameter
    label.appendChild(name)
    return label
  }


  /**
   * Constructs a div containing information about the currently created download list in the
   * fitsmanager. If there is one or more images available for download, also shows a table with
   * details of each file.
   * @returns {HTMLElement} HTMLDivElement with content of FITS Selection Overview
   */
  _createFITSSelectionOverview() {
    const selectionOverviewDiv = document.createElement('div')
    const resultsTitle = document.createElement('h5')
    resultsTitle.innerText = 'Selection Preview'
    selectionOverviewDiv.appendChild(resultsTitle)
    selectionOverviewDiv.id = 'fits-selection-overview'
    const overviewPanel = document.createElement('span')
    if (this.fitsmgr.currentQuery.length == 0) {
        overviewPanel.classList.add('red-text')
        overviewPanel.innerText = 'There are no images available in the selected region.'
    } else if (this.fitsmgr.downloadList.length == 0) {
        overviewPanel.classList.add('red-text')
        overviewPanel.innerText = 'There are no images available in the selected region that match your selection criteria'
    } else {
        overviewPanel.innerText = `Selection contains ${this.fitsmgr.downloadList.length} images (${(this.fitsmgr.getDownloadListSize() / 1e9).toFixed(2)} GB)`
    }
    selectionOverviewDiv.appendChild(overviewPanel)
    if (this.fitsmgr.downloadList.length != 0) {
      selectionOverviewDiv.appendChild(this._createFITSImageTable())
    }
    return selectionOverviewDiv
  }


  /**
   * Creates a 'download' button which opens the CADC download manager when clicked
   * @returns {HTMLElement} HTML Button Element
   */
  _createDownloadButton() {
    const downloadButton = document.createElement('button')
    downloadButton.innerText='Download Selection'
    downloadButton.classList.add('btn-flat','teal','white-text','lighten-2','fits-selection-dl-btn')
    downloadButton.addEventListener('click', (e) => {
        this._openDownloadManager() 
    })
    if (this.fitsmgr.downloadList.length == 0) downloadButton.classList.add('disabled')
    return downloadButton
  }


  /**
   * Updates the download list in the fits manager, and re-renders the selection table.
   * Modal must be already created to use this method
   */
  _refreshModalContent() {
    this.fitsmgr.updateDownloadList()
    this.availableImageDiv.innerText = ''
    this.availableImageDiv.appendChild(this._createFITSSelectionOverview())
  }


  /**
   * Replaces content of FITSModal with an iframe containing the CADC download manager page, and a
   * back button to return to 'main' screen of the FITSModal
   */
  _openDownloadManager() {    
    let iframe = document.createElement('iframe')
    iframe.name = 'download-mgr-iframe'
    iframe.id = 'download-mgr-iframe'
    this.setModalContent(iframe)
    let formElement = this.fitsmgr.getDownloadManagerForm('download-mgr-iframe')
    iframe.appendChild(formElement)
    formElement.submit()    

    let closeButton = document.createElement('button')
    closeButton.classList.add('btn','red','lighten-2')
    closeButton.innerText = 'Go Back'
    closeButton.addEventListener('click', (e) => {
      this._renderMainModalContent()
    })
    this.setModalFooter(closeButton)
  }


  /**
   * Constructs a table element for the table containing links and information about
   * the availiable fits images for the current selection. For internal use in the 
   * createFITSSelectionOverview method
   * @returns {HTMLElement} HTML Table element with information about each available fits image
   */
  _createFITSImageTable() {
    const table = document.createElement('table')
    table.classList.add('highlight')
    const tableHead = document.createElement('thead')
    const row = document.createElement('tr')
    for (const title of ['Filter','Exposure','Stacked','Proccesing','Pointing','FileType','Link']) {
        const titleColumn = document.createElement('th')
        titleColumn.innerText = title
        row.appendChild(titleColumn)
    }
    tableHead.appendChild(row)
    table.appendChild(tableHead)
    const tableBody = document.createElement('tbody')
    for (let link of this.fitsmgr.downloadList) {
        const row = document.createElement('tr')
        const filterCol = document.createElement('td')
        filterCol.innerText = link.filter
        const processingCol = document.createElement('td')
        processingCol.innerText = link.pipeline
        const exposureCol = document.createElement('td')
        exposureCol.innerText = link.exposure
        const pointingCol = document.createElement('td')
        pointingCol.innerText = link.pointing
        const stackedCol = document.createElement('td')
        stackedCol.innerText = link.stacked
        const filetypeCol = document.createElement('td')
        filetypeCol.innerText = link.fileype
        const linkCol = document.createElement('td')
        linkCol.innerHTML = `<a href='${link.url}'>${link.productID}</a>`
        row.append(filterCol, exposureCol, stackedCol, processingCol, pointingCol, filetypeCol, linkCol)
        tableBody.appendChild(row)
    }
    table.appendChild(tableBody)
    return table
  }
}

export default FITSModal