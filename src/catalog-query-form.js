class CatalogQueryForm {
  constructor(catalog) {
    this.catalog = catalog
    this.refineFieldDiv = this._createRefineFieldForm()
    this.refineButtonDiv = this._createButtonDiv()
  }

  render(node) {
    node.appendChild(this.refineFieldDiv)
    node.appendChild(this.refineButtonDiv)
  }

  _resetRefineFieldForm() {
    this.refineFieldDiv.reset()
  }





  

  _createRefineFieldForm() {
    let refineFieldDiv = document.createElement('form')
    refineFieldDiv.setAttribute('autocomplete','off')
    refineFieldDiv.setAttribute('class', 'refine-form row')
    for (let principleColumn of this.catalog.principleColumns) {
      refineFieldDiv.appendChild(this._createRefineField(principleColumn))
    }
    M.updateTextFields();
    return refineFieldDiv
  }

  /**
  * Creates an input field for an individual principle column for the catalog
  * @param {string} principleColumn principle column name for input field
  */
  _createRefineField(principleColumn) {
    let inputField = document.createElement('div')
    inputField.setAttribute('class', 'input-field col s6')
    
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
    buttonDiv.setAttribute('class', 'col s12 refine-btns')
    let submitButton = document.createElement('input')
    submitButton.setAttribute('value', 'apply')
    submitButton.setAttribute('class', 'btn-small')
    submitButton.setAttribute('type', 'button')
    submitButton.addEventListener('click', async () => {
      await this.catalog.query(true)
      this.catalog.addCurrentQueryToMap()
    })
    
    let downloadButton = document.createElement('input')
    downloadButton.setAttribute('value', 'download')
    downloadButton.setAttribute('type', 'button')
    downloadButton.setAttribute('class', 'btn-small orange lighten-2')
    downloadButton.addEventListener('click', async () => {
      await this.catalog.query(false)
      this.catalog.downloadQuery()
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

}

export default CatalogQueryForm