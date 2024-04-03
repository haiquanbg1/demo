const mysql = require('mysql2/promise')
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

const connection = mysql.createPool({
    host: config.host,
    database: config.database,
    user: config.username,
    password: config.password,
    port: config.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

module.exports = connection