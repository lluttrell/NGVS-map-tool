import { parseSelectionToConditions } from './query-builder'
import Papa from 'papaparse'

class Catalog {
  constructor(name, markerColor=null) {
    this.name = name;
    this.markerColor = markerColor;
    this.markerSize = 400;
    this.principleColumns = null;
    this.primaryKey = null;
    this.refineParameters = {};
    this.currentQuery = null;
    this.currentObjectQuery = null;
    this.currentDownload = null;
  }

  /**
   * Initializes the catalog object. Queries database to obtain principle column names for the 
   * catalog 
   */
  async init() {
    let response = await fetch(`http://206.12.92.202:8086/query/?QUERY=SELECT%20TOP%201%20*%20FROM%20${this.name}`)
    let csvText = await response.text()
    this.primaryKey = csvText.split(',')[0];
    this.principleColumns = csvText
      .split(',')
      .filter((attributeName) => attributeName.includes('principle'));
    
    return 1
  }

  async queryObject(objectName) {
    let queryString = `SELECT * FROM ${this.name} WHERE ${this.primaryKey} = '${objectName}'`
    queryString = encodeURIComponent(queryString)
    let response = await fetch(`http://206.12.92.202:8086/query/?QUERY=${queryString}`)
    let csvText = await response.text()
    let csvObj = Papa.parse(csvText, {dynamicTyping: true, header: true}).data[1]
    //csvArray = csvArray.slice(2,-3)
    this.currentObjectQuery = csvObj
    return 1
  }

  /**
   * queries database with (optional) constaints in refine parameters.
   * sets currentQuery to be an array containing name and coordinates of each object in the catalog
   * that satisfy the refine parameters
   */
  async query(locationOnly=true) {
    let self = this;
    let queryString = ''
    let parametersExist = false
    for (const parameter in this.refineParameters) {
        if (this.refineParameters[parameter] !== '') {
          queryString += parseSelectionToConditions(this.refineParameters[parameter], parameter)
          parametersExist = true
        }
    }
    if (parametersExist) queryString = `WHERE ${queryString}`;
    if (locationOnly) {
      queryString = `SELECT ${self.primaryKey}, principleRA, principleDEC from ${self.name} ${queryString}`
    } else {
      queryString = `SELECT * from ${self.name} ${queryString}`
    }
    let response = await fetch(`http://206.12.92.202:8086/query/?QUERY=${queryString}`)
    let csvText  = await response.text();
    let csvArray = Papa.parse(csvText, {dynamicTyping: true}).data
    csvArray = csvArray.slice(2,-3)
    self.currentQuery = csvArray;
    self.currentDownload = csvText;

    return 1
  }
}

export default Catalog