const nodemailer = require("nodemailer");
const {Employee, Admin} = require('../models')
const {sendEmail} = require('../utils/email')
const jwt = require("jsonwebtoken");

exports.resetPassword = async (req, res) => {
    const {email} = req.body
    let User
    let type
    //check if a user with this email exists 
    const admin = await Admin.findOne({ where : {username: email }})
    if (admin){
        User = admin
        type = 'admin'
    }
    else {
        const employee = await Employee.findOne({ where : {username: email }}) 
        if (employee){
            User = employee
            type = 'employee'
        }
        else
            return res.status(200).json({message: 'No user with this email exists'});        
    }
    const token = jwt.sign ({ id: User.id, type: type }, process.env.Reset_Password, {expiresIn: '15m'})
    // generate URL to be sent in email (body)
    const url = "http://localhost:8080/changePassword/" + token
    // call sendEmail
    const subject = "ITWORX Reset Password"
    const body = `  <h3> Hello ${User.first_name} </h3>
                    <h4> Please click down below to reset your password </h4>
                    <br>
                    <a href= ${url}> Click Here </a>`
    sendEmail(User.username, subject, body )   
    res.send("Sent")             
}
exports.changePassword = async (req,res) =>{
    const token = req.params.token
    const newPassword = req.body.password
    let user
    let Model
    jwt.verify(token, process.env.Reset_Password, (err, data) =>{
        if (err){
            return res.status(400).json({ message: "Token is incorrect or expired"})
        }
        if (type === 'admin') 
            Model = Admin
        else
            Model = Employee

        user = Model.findOne({where: {username: data.username}})
    })

    const newHashedPassword = await bcrypt.hash(newPassword, 10)
    await Model.update({password: newHashedPassword}, { where: { username: user.username } })
    res.json({message: 'Password changed successfylly!'})

}