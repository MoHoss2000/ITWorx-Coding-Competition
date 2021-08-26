const mysql = require('mysql2')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('itworx', 'itworx@itworx', 'Admin@2021', {
    host: 'itworx.mysql.database.azure.com',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  });
const db = mysql.createConnection({
    user: 'itworx@itworx',
    host: 'itworx.mysql.database.azure.com',
    password: 'Admin@2021',
    database: 'itworx',
})

module.exports = { db, sequelize }