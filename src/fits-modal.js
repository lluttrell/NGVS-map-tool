import { config } from '../app.config'
import 'leaflet'

class FITSModal {
  /**
   * Class used to render a pop-up modal that allows 
   * @constructor
   * @param {L.Bounds} areaBounds Leaflet Bounds object representing region selected by user
   * @param {FITSManager} fitsmgr FITSManager used for querying and remembering user input state
   */
  constructor(areaBounds, fitsmgr) {
    this.fitsmgr = fitsmgr
    this.bottomLeftCoordinate = areaBounds.getSouthWest()
    this.topRightCoordinate = areaBounds.getNorthEast()
  }


  async render() {
    let elem = document.getElementById('download-modal')
    let modalInstance = M.Modal.init(elem, {dismissible: true});
    let modalBody = document.getElementById('download-modal-content')
    modalBody.innerHTML = '<p>Retrieving selection from database</p>'
    modalBody.innerHTML += '<div class="progress"><div class="indeterminate"></div></div>'
    modalInstance.open();

    await this.fitsmgr.getPublisherIdAtRegion(this.bottomLeftCoordinate, this.topRightCoordinate)
    
    modalBody.innerHTML = ''
    const modalTitle = document.createElement('h4')
    modalTitle.innerHTML = 'FITS Image Selection'
    modalBody.appendChild(modalTitle)
    const filterTitle = document.createElement('h6')
    filterTitle.innerText = 'Filters'
    modalBody.appendChild(filterTitle)
    modalBody.appendChild(this._createFITSFilterSelectionButtons())
    const exposureTitle = document.createElement('h6')
    exposureTitle.innerText = 'Exposures'
    modalBody.appendChild(exposureTitle)
    modalBody.appendChild(this._createFITSExposureSelectionButtons())
    const stackedTitle = document.createElement('h6')
    stackedTitle.innerText = 'Stacked Images'
    modalBody.appendChild(stackedTitle)
    modalBody.appendChild(this._createFITSStackedSelectionButtons())
    const individualTitle = document.createElement('h6')
    individualTitle.innerText = 'Single Images'
    modalBody.appendChild(individualTitle)
    modalBody.appendChild(this._createFITSIndividualSelectionButtons())
    modalBody.appendChild(this._createFITSSelectionOverview())  
  }


  _createFITSFilterSelectionButtons() {
    const buttonDiv = document.createElement('div')
    for (const filter of config.filters) {
        const button = document.createElement('label')
        button.classList.add('fits-selection-label')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type','checkbox')
        checkbox.classList.add('filled-in')
        if (!this.fitsmgr.availableFilters.has(filter)) checkbox.setAttribute('disabled','disabled')
        if (this.fitsmgr.selectedFilters.includes(filter)) checkbox.setAttribute('checked','checked')
        checkbox.addEventListener('change', (e) => {
            if (!e.target.checked) {
              // this is really confusing as there are two filters and i'm using the filter function
              this.fitsmgr.selectedFilters = this.fitsmgr.selectedFilters.filter(f => f != filter)
            } else {
              this.fitsmgr.selectedFilters.push(filter)
            }
            this._refreshFITSSelectionOverview();
        })
        const name = document.createElement('span')
        name.innerText = filter
        button.appendChild(checkbox)
        button.appendChild(name)
        buttonDiv.appendChild(button)
    }
    return buttonDiv
  }


  _createFITSExposureSelectionButtons() {
    const buttonDiv = document.createElement('div')
    for (const exposure of config.exposures) {
        const button = document.createElement('label')
        button.classList.add('fits-selection-label')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type','checkbox')
        checkbox.classList.add('filled-in')
        if (!this.fitsmgr.availableExposures.has(exposure)) checkbox.setAttribute('disabled','disabled')
        if (this.fitsmgr.selectedExposures.includes(exposure)) checkbox.setAttribute('checked','checked')
        checkbox.addEventListener('change', (e) => {
            if (!e.target.checked) {
              this.fitsmgr.selectedExposures = this.fitsmgr.selectedExposures.filter(f => f != exposure)
            } else {
              this.fitsmgr.selectedExposures.push(exposure)
            }
            this._refreshFITSSelectionOverview();
        })
        const name = document.createElement('span')
        name.innerText = exposure
        button.appendChild(checkbox)
        button.appendChild(name)
        buttonDiv.appendChild(button)
    }
    return buttonDiv
  }


  _createFITSStackedSelectionButtons() {
    const buttonDiv = document.createElement('div')
    for (const pipeline of config.stackedPipelines) {
        const button = document.createElement('label')
        button.classList.add('fits-selection-label')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type','checkbox')
        checkbox.classList.add('filled-in')
        if (!this.fitsmgr.availableStackedPipelines.has(pipeline)) checkbox.setAttribute('disabled','disabled')
        if (this.fitsmgr.selectedStackedPipelines.includes(pipeline)) checkbox.setAttribute('checked','checked')
        checkbox.addEventListener('change', (e) => {
            if (!e.target.checked) {
              this.fitsmgr.selectedStackedPipelines = this.fitsmgr.selectedStackedPipelines.filter(f => f != pipeline)
            } else {
              this.fitsmgr.selectedStackedPipelines.push(pipeline)
            }
            this._refreshFITSSelectionOverview();
        })
        const name = document.createElement('span')
        name.innerText = pipeline
        button.appendChild(checkbox)
        button.appendChild(name)
        buttonDiv.appendChild(button)
    }
    return buttonDiv
  }

  _createFITSIndividualSelectionButtons() {
    const buttonDiv = document.createElement('div')
    for (const pipeline of config.individualPipelines) {
        const button = document.createElement('label')
        button.classList.add('fits-selection-label')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type','checkbox')
        checkbox.classList.add('filled-in')
        if (!this.fitsmgr.availableIndividualPipelines.has(pipeline)) checkbox.setAttribute('disabled','disabled')
        if (this.fitsmgr.selectedIndividualPipelines.includes(pipeline)) checkbox.setAttribute('checked','checked')
        checkbox.addEventListener('change', (e) => {
            if (!e.target.checked) {
              this.fitsmgr.selectedIndividualPipelines = this.fitsmgr.selectedIndividualPipelines.filter(f => f != pipeline)
            } else {
              this.fitsmgr.selectedIndividualPipelines.push(pipeline)
            }
            this._refreshFITSSelectionOverview();
        })
        const name = document.createElement('span')
        name.innerText = pipeline
        button.appendChild(checkbox)
        button.appendChild(name)
        buttonDiv.appendChild(button)
    }
    return buttonDiv
  }


  /**
   * Constructs a div containing information about the currently created download list in the
   * fitsmanager. If there is one or more images available for download, also shows a table with
   * details of each file
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
        overviewPanel.innerText = `Selection contains ${this.fitsmgr.downloadList.length} images`
    }
    selectionOverviewDiv.appendChild(overviewPanel)
    if (this.fitsmgr.downloadList.length != 0) {
        const downloadButton = document.createElement('button')
        downloadButton.innerText='Download Selection'
        downloadButton.classList.add('btn-flat','teal','white-text','lighten-2','fits-selection-dl-btn')
        downloadButton.addEventListener('click', (e) => {
            this._openDownloadManager() 
        })
        selectionOverviewDiv.appendChild(downloadButton)
        const downloadTextButton = document.createElement('button')
        downloadTextButton.innerText='Download URL List'
        downloadTextButton.classList.add('btn-flat','red','white-text','lighten-2','fits-selection-dl-btn')
        downloadTextButton.addEventListener('click', () => { this.fitsmgr.downloadSelectionURLList() })
        selectionOverviewDiv.appendChild(downloadTextButton)
        selectionOverviewDiv.appendChild(this._createFITSImageTable())
    }
    return selectionOverviewDiv
  }


  /**
   * Updates the download list in the fits manager, and re-renders the selection table.
   * Modal must be already created to use this method
   */
  _refreshFITSSelectionOverview() {
    this.fitsmgr.updateDownloadList()
    const fitsSelectionOverview = document.getElementById('fits-selection-overview')
    fitsSelectionOverview.innerText = ''
    fitsSelectionOverview.appendChild(this._createFITSSelectionOverview())
  }


  _openDownloadManager() {
    //let modal = document.getElementById('download-mgr-modal')
    //let modalInstance = M.Modal.init(modal, {dismissible: true});
    let modalBody = document.getElementById('download-modal-content')
    modalBody.innerText = ''
    let iframe = document.createElement('iframe')
    iframe.name = 'download-mgr-iframe'
    iframe.id = 'download-mgr-iframe'
    modalBody.appendChild(iframe)
    let formElement = this.fitsmgr.getDownloadManagerForm('download-mgr-iframe')
    iframe.appendChild(formElement)
    formElement.submit();
    //modalInstance.open()
  }


  /**
   * Constructs a table element for the table containing links and information about
   * the availiable fits images for the current selection. For internal use in the 
   * createFITSSelectionOverview method
   */
  _createFITSImageTable() {
    const table = document.createElement('table')
    table.classList.add('highlight')
    const tableHead = document.createElement('thead')
    const row = document.createElement('tr')
    for (const title of ['Filter','Exposure','Stacked','Proccesing','Pointing','Link']) {
        const titleColumn = document.createElement('th')
        titleColumn.innerText = title
        row.appendChild(titleColumn)
    }
    tableHead.appendChild(row)
    table.appendChild(tableHead)
    const tableBody = document.createElement('tbody')
    for (let link of this.fitsmgr.downloadList) {
        const row = document.createElement('tr');
        const filterCol = document.createElement('td');
        filterCol.innerText = link.filter;
        const processingCol = document.createElement('td');
        processingCol.innerText = link.pipeline;
        const exposureCol = document.createElement('td');
        exposureCol.innerText = link.exposure;
        const pointingCol = document.createElement('td');
        pointingCol.innerText = link.pointing;
        const stackedCol = document.createElement('td');
        stackedCol.innerText = link.stacked;
        const linkCol = document.createElement('td');
        linkCol.innerHTML = `<a href='${link.url}'>${link.productID}</a>`;
        row.append(filterCol, exposureCol, stackedCol, processingCol, pointingCol, linkCol);
        tableBody.appendChild(row)
    }
    table.appendChild(tableBody)
    return table
  }
}

export default FITSModal