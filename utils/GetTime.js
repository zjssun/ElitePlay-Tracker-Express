const moment = require('moment');

function GetTime(date) {
   moment.locale('zh-cn');
   return moment(date).format('MMMM Do YYYY, h:mm:ss');
}

module.exports = GetTime;