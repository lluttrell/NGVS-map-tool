import './styles/catalog-query-form.css'


/**
 * CatalogQueryForm creates a form contianing text fields for each principle column for a Catalog
 * object. The form allows users to set refinement parameters for the Catalog object. The form contains
 * buttons to call apply/download functions in the Catalog Object
 */
class CatalogQueryForm {
  /**
   * Creates a new instance of CatalogQueryForm
   * @param {Catalog} catalog Catalog to create form for 
   */
  constructor(catalog) {
    this.catalog = catalog
    this.refineFieldDiv = this._createRefineFieldForm()
    this.progressDiv = document.createElement('div')
    this.refineButtonDiv = this._createButtonDiv()
  }


  /**
   * Renders the form as a children of the node element
   * @param {HTMLElement} node element to append query form to
   */
  render(node) {
    node.appendChild(this.refineFieldDiv)
    node.appendChild(this.progressDiv)
    node.appendChild(this.refineButtonDiv)
  }


  /**
   * Resets the HTML Fork
   */
  _resetRefineFieldForm() {
    this.refineFieldDiv.reset()
  }


  /**
   * @return {HTMLElement} HTML Form Element containing all the refine text inputs
   */
  _createRefineFieldForm() {
    let refineFieldDiv = document.createElement('form')
    refineFieldDiv.setAttribute('autocomplete','off')
    refineFieldDiv.classList.add('refine-form','row')
    for (let principleColumn of this.catalog.principleColumns) {
      refineFieldDiv.appendChild(this._createRefineField(principleColumn))
    }
    M.updateTextFields()
    return refineFieldDiv
  }


  /**
  * Creates an input field for an individual principle column for the catalog
  * @param {string} principleColumn principle column name for input field
  */
  _createRefineField(principleColumn) {
    let inputField = document.createElement('div')
    inputField.classList.add('input-field','col','s6')
    inputField.setAttribute('data-position','right')
    let input = document.createElement('input')
    input.setAttribute('name', principleColumn)
    input.setAttribute('type', 'text')
    input.setAttribute('id', `${this.catalog.name}-${principleColumn}`)
    input.value = this.catalog.getRefineParameterString(principleColumn)
    input.addEventListener('input', () => { 
      this.catalog.setRefineParameter(principleColumn, input.value)
    })
    let label = document.createElement('label')
    label.setAttribute('for', `${this.catalog.name}-${principleColumn}`)
    label.innerText = `${principleColumn.slice(9)}`
    inputField.appendChild(label)
    inputField.appendChild(input)
    return inputField
  }


  /**
  * Creates the apply, clear, and download buttons for the refine section
  */
  _createButtonDiv() {
    let buttonDiv = document.createElement('div')
    buttonDiv.classList.add('col','s12','refine-btns')
    let submitButton = document.createElement('input')
    submitButton.setAttribute('value', 'apply')
    submitButton.setAttribute('class', 'btn-small')
    submitButton.setAttribute('type', 'button')
    submitButton.addEventListener('click', async () => {
      this.loaderOn()
      await this.catalog.query(true)
      if (this.catalog.getResultsLength() != 0) {
        M.toast({html: `Query returned ${this.catalog.getResultsLength()} objects`, classes:'teal'})
        this.catalog.addCurrentQueryToMap()
      } else {
        M.toast({html: 'Query matched no objects', classes:'red lighten-2'})
      }
      this.loaderOff()
    })
    
    let downloadButton = document.createElement('input')
    downloadButton.setAttribute('value', 'download')
    downloadButton.setAttribute('type', 'button')
    downloadButton.classList.add('btn-small','orange','lighten-2')
    downloadButton.addEventListener('click', async () => {
      this.loaderOn()
      await this.catalog.query(false)
      if (this.catalog.getResultsLength() != 0) {
        this.catalog.downloadQuery()
      } else {
        M.toast({html: 'Query returned no results', classes:'red lighten-2'})
      }
      this.loaderOff()
    })
    
    let clearButton = document.createElement('input')
    clearButton.setAttribute('type', 'button')
    clearButton.setAttribute('value', 'clear')
    clearButton.setAttribute('class', 'btn-small red lighten-2')
    clearButton.addEventListener('click', () => {
      this.catalog.removeCurrentQueryFromMap()
      this.catalog.clearRefineParameters()
      this._resetRefineFieldForm()
    })
    
    buttonDiv.appendChild(submitButton)
    buttonDiv.appendChild(downloadButton)
    buttonDiv.appendChild(clearButton)
    return buttonDiv
  }


  /**
   * Turns on the form loading bar
   */
  loaderOn() {
    this.progressDiv.classList.add('progress')
    this.progressDiv.innerHTML = '<div class="indeterminate"></div>'
  }


  /**
   * Turns off the form loading bar
   */
  loaderOff() {
    this.progressDiv.classList.remove('progress')
    this.progressDiv.innerHTML = ''
  }
}

export default CatalogQueryForm