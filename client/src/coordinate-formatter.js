/**
 * @fileoverview Collection of functions used to format coordinates into strings
 * representing the coordinate in a variety of formats
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
    num = (num*-1)+180;
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

const dms_formatter = (num) => {
  var deg = Math.floor(num) ;
  var frac = Math.abs(num - deg);
  var min = Math.floor(frac * 60);
  var sec = Math.floor(frac * 3600 - min * 60 );
  var fsec = Math.floor((frac * 3600 - min * 60 - sec ) * 10) ;
  return ("00" + deg).slice(-2) + ":" + ("00" + min).slice(-2) + ":" + ( "00" + sec).slice(-2) + "." + fsec;
};

const hms_formatter = (num) => {
  if(num < 0) { num = (num*-1)+180;}
  var hour = Math.floor(num / 15);
  var minute = Math.floor((num/15 - hour)*60);
  var sec = Math.floor(hour * 3600 - minute * 60 );
  var fsec = Math.floor(( hour * 3600 - minute * 60 - sec ) * 100) ;
  return ("00" + hour).slice(-2) + ":" + ("00" + minute).slice(-2) + ":" + ("00" + sec).slice(-2) + "." + fsec;
}

export { decimal_dec_formatter, decimal_ra_formatter, dms_formatter, hms_formatter }