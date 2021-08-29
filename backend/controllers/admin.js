const {Employee, Admin} = require('../models')
const nodemailer = require("nodemailer");

exports.resetPassword = async (req, res) => {
    const {email} = req.body
    let User
    //check if a user with this email exists 
    const admin = await Admin.findOne({ username: email })
    if (admin)
        User = admin
    else {
        const employee = await Employee.findOne({ username: email }) 
        if (employee)
            User = employee
        else
            return res.status(200).json({message: 'No user with this email exists'});        
    }
    const token = jwt.sign ({ id: User.id}, Process.env.Reset_Password, {expiresIn: '15m'})

    

}