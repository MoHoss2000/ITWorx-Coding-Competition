const nodemailer = require("nodemailer");

exports.sendEmail = (email, subject, html) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: process.env.Email,
            pass: process.env.Password
        }
    });
    
    let mailDetails = {
        from: process.env.Email,
        to: email,
        subject,
        html
    };
    
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err)
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
}