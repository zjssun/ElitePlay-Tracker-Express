const moment = require('moment');

function GetTime(date) {
   moment.locale('zh-cn');
   return moment(date).format('YYYY/MM/DD,h:mm:ss');
}

module.exports = GetTime;