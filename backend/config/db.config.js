const mysql = require("mysql");

var connectionConfig = {
    host: "itworx.mysql.database.azure.com",
    user: "itworx@itworx",
    password: "Admin@2021",
    database: "itworx",
  };

var connection = mysql.createPool(connectionConfig);

connection.getConnection(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }  
});

module.exports = connection;