import TapClient from './tap-client'

class Catalog {
  constructor(name, color=null) {
    this.name = name;
    this.color = color;
  }
  init() {
    this.principleColumnNames = TapClient.query(`SELECT TOP 1 * FROM ${this.name}`).split(',') 
  }

}

export default Catalog