const moment = require('moment');

function GetTime(date,format) {
   return moment(date).format(format);
}

function ComparisonTime(time){
  return moment().isAfter(new Date(parseInt(time)+5270400000),'month');
}

module.exports = {GetTime,ComparisonTime};