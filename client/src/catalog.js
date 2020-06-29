import { parseSelectionToConditions } from './query-builder'

class Catalog {
  constructor(name, markerColor=null) {
    this.name = name;
    this.markerColor = markerColor;
    this.principleColumns = null;
    this.refineParameters = {};
  }

  async init() {
    let self = this;
    // retrieve principle column names
    await fetch(`http://127.0.0.1:5000/query/?QUERY=SELECT%20TOP%201%20*%20FROM%20${this.name}`)
      .then(response => response.text())
      .then(text => {
        self.primaryKey = text.split(',')[0];
        self.principleColumns = text
          .split(',')
          .filter((attributeName) => attributeName.includes('principle'))
      })
    return
  }

  getObjectLocations() {
    let self = this;
    let filterString = ''
    if (Object.keys(this.refineParameters).length !== 0) {
      filterString += 'WHERE '
      for (const parameter in this.refineParameters) {
        filterString += parseSelectionToConditions(this.refineParameters[parameter], parameter)
      }
    }

    fetch(`http://127.0.0.1:5000/query/?QUERY=SELECT ${self.primaryKey}, principleRA, principleDEC from ${self.name} ${filterString}`)
      .then(response => response.text())
      .then(json => console.log(json))
  }


}

export default Catalog