/**
 * @fileoverview This script is used to retrieve the field outline csv files from the database
 *  before building the site. The field outlines should not change often and fetching is fairly
 * expensive, so they are retrieved and bundled at static assets instead of fetched at runtime 
 */

const https = require('follow-redirects').https;
const fs = require('fs');
const path = require('path');

console.log('retrieving field outline csv files')

// update field outline files
const minLongExposureTime = 410
const minLongStackedExposureTime = 410 * 5

let fieldOutlineQueryParameters = [
  {
    filename: 'long_single',
    timeExposure: `>${minLongExposureTime}`,
    provenanceName: `='ELIXIR'`
  },
  {
    filename: 'short_single',
    timeExposure: `<${minLongExposureTime}`,
    provenanceName: `='ELIXIR'`
  },
  {
    filename: 'short_stacked',
    timeExposure: `<${minLongStackedExposureTime}`,
    provenanceName: `='MEGAPIPE'`
  },
  {
    filename: 'long_stacked',
    timeExposure: `>${minLongStackedExposureTime}`,
    provenanceName: `='MEGAPIPE'`
  }
]


fieldOutlineQueryParameters.forEach((obj) => {
  let queryString =  `SELECT DISTINCT position_bounds, energy_bandpassName
  FROM caom2.Observation as o JOIN caom2.Plane p on o.obsID=p.obsID
  WHERE o.proposal_project='NGVS' AND o.type='OBJECT' AND provenance_name${obj.provenanceName} AND time_exposure${obj.timeExposure}
  ORDER BY energy_bandpassName ASC`

  let options = {
    'method': 'GET',
    'hostname':'www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca',
    'path': encodeURI(`/argus/sync?LANG=ADQL&FORMAT=csv&QUERY=${queryString}`),
    'headers': {},
    'maxRedirects': 20
  }

  let req = https.request(options, (res) => {
    let chunks = [];
    res.on("data", (chunk) => chunks.push(chunk));
    res.on("end", (chunk) => {
      let body = Buffer.concat(chunks);
      fs.writeFile(path.join(__dirname,`/assets/field_outlines_${obj.filename}.csv`), body, (err) => {
        if (err) return console.error(err)
        else return console.log(`updated field_outlines${obj.filename}.csv`)
      })
    });
    res.on("error", (error) => console.error(error));  
  })
  req.end();
})

// update NGVS pointing files
let queryString = ` SELECT DISTINCT target_name, position_bounds
  FROM caom2.Observation as o JOIN caom2.Plane p on o.obsID=p.obsID
  WHERE o.proposal_project='NGVS' AND o.type='OBJECT' AND provenance_name='MEGAPIPE' 
  ORDER BY target_name ASC`

  let options = {
  'method' : 'GET',
  'hostname' : 'www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca',
  'path': encodeURI(`/argus/sync?LANG=ADQL&FORMAT=csv&QUERY=${queryString}`),
  'headers': {},
  'maxRedirects': 20
}

let req = https.request(options, (res) => {
  let chunks = [];
  res.on("data", (chunk) => chunks.push(chunk));
  res.on("end", (chunk) => {
    let body = Buffer.concat(chunks);
    fs.writeFile(path.join(__dirname,'/assets/ngvs_pointings.csv'), body, (err) => {
      if (err) return console.error(err)
      else return console.log(`updated ngvs_pointings.csv`)
    })
  });
  res.on("error", (error) => console.error(error));  
})
req.end();