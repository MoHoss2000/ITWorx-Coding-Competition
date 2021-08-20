// const db = require("../models");
// const User = db.users;
// const Op = db.Sequelize.Op;

const connection = require('../config/db.config');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    var query = `SELECT * FROM user WHERE username = '${username}' and password = '${password}'`;

    connection.query(query, function (err, results, fields) {
      // console.log(results);
      if(results.length < 1){
        return res.status(401).json({
          // invalid username or wrong password
          message: 'Auth failed'
        });
      }

      const payload = {
        user_type: results[0].user_type,
        first_name: results[0].first_name,
        last_name: results[0].last_name
      };

      // console.log(payload);
      const token = jwt.sign(
        payload
        ,'secret',
        {
          expiresIn: '1h'
        },
      );


      return res.status(200).json({
        message: 'Auth successful',
        token: token,
      });
      
    })

}