import longOutlines from './ngvs_filter_outlines_long.csv'
import { config } from '../app.config'

class FieldOutlines {
  // baseQuery = `SELECT time_exposure, target_name, position_bounds, energy_bandpassName
  //     FROM caom2.Observation as o JOIN caom2.Plane p on o.obsID=p.obsID
  //     WHERE o.proposal_project='NGVS' AND o.type='OBJECT'`
  
  constructor() {
    longOutlines.shift()
    for (let row of longOutlines) {
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

