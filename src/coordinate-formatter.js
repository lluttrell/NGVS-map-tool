/**
 * @fileoverview Collection of functions used to format coordinates into strings
 * representing the coordinate in a variety of formats. Note this was written for
 * the mouse coordinate position and there may be precision errors. May be 
 * unsuitable for other uses.
 */

/**
 * Takes a right ascension value in decimal format in the range (-180, 360) and returns
 * a rounded decimal format in the range (0,360).
 * @param {number} num number to format.
 * @param {number} precision number of decimal places to round to.
 */
const decimal_ra_formatter = (num, precision=4) => {
  if (num <= -180 || num >= 360) {
    throw new RangeError('Coordinate must be between -180 and 360.')
  } else if (num < 0) {
    num = 180 - num;
  }
  return num.toFixed(precision)
};


/**
 * Takes a declination value in decimal format and returns a rounded decimal format in the
 * range (-90,90)
 * @param {number} num number to format.
 * @param {number} precision number of decimal places to round to.
 */
const decimal_dec_formatter = (num, precision=4) => {
  if (num < -90 || num > 90) {
    throw new RangeError('Coordinate must be between -90 and 90')
  }
  return num.toFixed(precision);
};

/**
 * Takes a declination value in decimal format and returns coordinate in
 * DMS format
 * @param {number} num number to format.
 * @param {number} precision number of decimal places to round to.
 */
const dms_formatter = (num, precision=0) => {
  if (num < -90 || num > 90) {
    throw new RangeError('Coordinate must be between -90 and 90')
  }
  let deg = Math.floor(num) ;
  let frac = Math.abs(num - deg);
  let min = Math.floor(frac * 60);
  let sec = Math.floor(frac * 3600 - min * 60 );
  let fsec = (frac * 3600 - min * 60 - sec ).toFixed(precision) ;
  return ("00" + deg).slice(-2) + ":" + ("00" + min).slice(-2) + ":" + ( "00" + sec).slice(-2) + fsec.toString().slice(1, precision + 2);
};

/**
 * Takes a declination value in decimal format and returns coordinate in
 * DMS format
 * @param {number} num number to format.
 * @param {number} precision number of decimal places to round to.
 */
const hms_formatter = (num, precision=0) => {
  if (num <= -180 || num >= 360) {
    throw new RangeError('Coordinate must be between -180 and 360.')
  } else if(num < 0) {
    num = 180 - num;
  }
  let hrs = Math.floor(num/15);
  let min = Math.floor((num/15 - hrs) * 60);
  let sec = (num/15 - hrs - min/60) * 3600;
  let wsec = Math.floor(sec);
  let fsec = (sec - wsec).toFixed(precision)
  return ("00" + hrs).slice(-2) + ":" + ("00" + min).slice(-2) + ":" + ("00" + wsec).slice(-2) + fsec.toString().slice(1, precision + 2);

}

export { decimal_dec_formatter, decimal_ra_formatter, dms_formatter, hms_formatter }