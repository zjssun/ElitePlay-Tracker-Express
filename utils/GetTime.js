const moment = require('moment');

function GetTime(date) {
   return moment(date).format('YYYY/MM/DD,h:mm:ss');
}

function ComparisonTime(time){
  return moment().isAfter(new Date(parseInt(time)+2678400000),'month');
}

module.exports = {GetTime,ComparisonTime};