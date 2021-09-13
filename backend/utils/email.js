const nodemailer = require("nodemailer");

exports.sendEmail = (email, subject, html) => {
    let mailTransporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
    
    let mailDetails = {
        from: process.env.SMTP_EMAIL,
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