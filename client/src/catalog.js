import { parseSelectionToConditions } from './query-builder'
import Papa from 'papaparse'

class Catalog {
  constructor(name, markerColor=null) {
    this.name = name;
    this.markerColor = markerColor;
    this.markerSize = 400;
    this.principleColumns = null;
    this.refineParameters = {};
    this.currentQuery = null
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


  async getObjectLocations() {
    let self = this;
    let filterString = ''
    let parametersExist = false
    for (const parameter in this.refineParameters) {
        if (this.refineParameters[parameter] !== '') {
          filterString += parseSelectionToConditions(this.refineParameters[parameter], parameter)
          parametersExist = true
        }
    }
    if (parametersExist) filterString = `WHERE ${filterString}`; 

    let response = await fetch(`http://127.0.0.1:5000/query/?QUERY=SELECT ${self.primaryKey}, principleRA, principleDEC from ${self.name} ${filterString}`)
    let csvText  = await response.text();
    let csvArray = Papa.parse(csvText, {dynamicTyping: true}).data.slice(2);
    self.currentQuery = csvArray;
    return 1
  }


}

export default Catalog