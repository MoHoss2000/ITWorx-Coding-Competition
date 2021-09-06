const mysql = require('mysql')


const db = mysql.createPool({
    user: 'itworx@itworx',
    host: 'itworx.mysql.database.azure.com',
    password: 'Admin@2021',
    database: 'itworx',
    multipleStatements: true
})

module.exports = db