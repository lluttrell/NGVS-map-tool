import { decimal_ra_formatter } from './coordinate-formatter'

class FITZManager {
  constructor() {
    this.filterList = ['u']
  }

  buildQueryString() {
    // publisherId, accessURL
    let baseQuery = `SELECT publisherId, time_exposure, publisherId, energy_bandpassName, target_name
      FROM caom2.Observation as o JOIN caom2.Plane p on o.obsID=p.obsID JOIN caom2.Artifact a on a.planeID=p.planeID
      WHERE o.proposal_project='NGVS' AND o.type='OBJECT' AND a.productType='science'`;
    let filterQuery = ''
    for (let filter of this.filterList) {
      filterQuery += ` energy_bandpassName LIKE '${filter}%' OR`
    }
    filterQuery = `AND (${filterQuery.slice(0,-3)})`
    return baseQuery + filterQuery
  }

  getPublisherIdAtPoint(coordinates) {
    let queryString = this.buildQueryString();
    queryString += ` AND 1=CONTAINS(POINT('ICRS',${coordinates[1]},${coordinates[0]}), p.position_bounds)`
    this.query(queryString)
  }


  getPublisherIdAtRegion(bottomLeftCoords, topRightCoords) {
    const minDec = bottomLeftCoords.lat;
    const minRA = decimal_ra_formatter(bottomLeftCoords.lng,8);
    const maxDec = topRightCoords.lat;
    const maxRA = decimal_ra_formatter(topRightCoords.lng,8);
    let queryString = this.buildQueryString();
    const regionPolygon = `POLYGON('ICRS', ${minRA}, ${minDec}, ${minRA}, ${maxDec}, ${maxRA}, ${maxDec}, ${maxRA}, ${minDec})`
    queryString += ` AND 1=INTERSECTS(${regionPolygon}, p.position_bounds)`
    this.query(queryString)
  }

  async query(queryString) {
    console.log(queryString)
    let encodedQuery = encodeURIComponent(queryString)
    const queryResult = await fetch(`https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/argus/sync?LANG=ADQL&QUERY=${encodedQuery}&FORMAT=csv`)
    const response = await queryResult.text();
    console.log(response)
    return 1;
  }
}

export default FITZManager