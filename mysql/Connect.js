const mysql = require('mysql2');
const DBcfg = require('./DBcfg');

const config = DBcfg();

async function connect() {
   const promisePool = mysql.createPool(config).promise();
   const result = await promisePool.query("select * from test");
   return result[0];
}

module.exports = connect;
