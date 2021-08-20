// const db = require("../models");
// const User = db.users;
// const Op = db.Sequelize.Op;

const connection = require('../config/db.config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
        ,process.env.JWT_KEY,
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

exports.resetPassword = async (req, res)  =>  {
    var email = req.body.email;
    

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, 
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"ITWorx No Reply 👻" <${process.env.SMTP_USER}>`, // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      text: "Reset your password from the following link", // plain text body
      html: "<b>Reset your password from the following link: test.itworx.com</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

    res.send('email sent');


    // var query = `SELECT * FROM user WHERE username = '${username}' and password = '${password}'`;

    // connection.query(query, function (err, results, fields) {
    //   // console.log(results);
    // });     
}