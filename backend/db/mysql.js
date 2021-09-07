const mysql = require('mysql')
const fs = require('fs');

const db = mysql.createConnection({
    user: 'admin',
    host: 'db-mysql-nyc1-90314-do-user-9802367-0.b.db.ondigitalocean.com',
    password: 'SMkcUUHo3IbL-5jO',
    port: 25060,
    database: 'defaultdb',
    ssl:{
        ca : fs.readFileSync(__dirname + '/ca-certificate.crt'),
    },
})

module.exports = db