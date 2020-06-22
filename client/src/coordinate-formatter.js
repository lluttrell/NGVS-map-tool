const decimal_ra_formatter = (num) => {
  if(num < 0) { num = (num*-1)+180;} 
  return num.toFixed(4)
};

const decimal_dec_formatter = (num) => {
  return num.toFixed(4);
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