import Data from './list.csv'
import { config } from '../app.config'

class FieldOutlines {
  
  constructor() {
    Data.shift()
    for (let row of Data) {
      const outlineCoordinate = [[row[0], row[1]],
                                [row[2], row[3]],
                                [row[4], row[5]],
                                [row[6], row[7]]
                                ]
      const band = row[8]
      if (band in this) {
        this[band].coordinates.push(outlineCoordinate)
      } else {
        this[band] = {}
        this[band].coordinates = [outlineCoordinate]
        this[band].color = config.fieldColors[band]
      }
    }
  }
}

export default FieldOutlines

