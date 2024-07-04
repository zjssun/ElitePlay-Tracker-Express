const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: '',
    database: "eptracker",
    waitForConnections: true,
    connectionLimit: 10,
})

const promisePool = pool.promise();

module.exports = promisePool;