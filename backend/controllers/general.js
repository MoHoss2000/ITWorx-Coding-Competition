const nodemailer = require("nodemailer");
const {sendEmail} = require('../utils/email')
const jwt = require("jsonwebtoken");
const db = require('../db/mysql')
const bcrypt = require('bcrypt')
const {createToken} = require ('../utils/tokens')
exports.changePassword = async (req, res) =>{
    const  id = req.id 
    const userType = req.userType
    const { oldPassword, newPassword } = req.body
    let User
    if(userType === 'employee')
        User = Employee
    else
        User = Admin
   try{
        const user = await User.findOne({where: { id }});
        const hashedPassword = user.password
        const matched = await bcrypt.compare(oldPassword, hashedPassword)

        if(!matched) return res.json({message: 'Old password is incorrect'})

        const newHashedPassword = await bcrypt.hash(newPassword, 10)
        await User.update({password: newHashedPassword}, { where: { id } })
        res.json({message: 'Password changed successfylly!'})
   }catch(e){
       res.status(400).send(e)
   }
}

exports.resetPassword = async (req, res) => {
    console.log("hi")
    const {email} = req.body
    console.log(email)
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

exports.newPassword = async (req,res) =>{
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

exports.register = async (req, res) => {
    // we take the input enetered by the user from the request
    const { first_name, last_name, username, password , is_developer, is_admin } = req.body;  
    const findUser = is_admin ? 'CALL findAdmin(?)' : 'CALL findEmployee(?)'
    const addUser = is_admin ? 'CALL addAdmin(?,?,?,?)' : 'CALL addEmployee(?,?,?,?,?,?)'

    db.query(findUser, username, async (err, found) => {
        if(found[0][0])
            return res.status(400).json({error: "Username exists"})
        const hashedPassword = await bcrypt.hash(password, 10)
        const arrayOfData = is_admin ? 
                                    [first_name, last_name, username, hashedPassword] : 
                                    [first_name, last_name, username, hashedPassword, is_developer, 0]
        db.query(addUser, arrayOfData, (err, queryRes) => {
            if(queryRes){
                db.query(findUser, username,(err, result) => {
                    const type = is_admin ? 'admin' : 'employee'
                    const user = { id: result[0][0].id, type }
                    const token = createToken(user)
                    res.cookie("token", token, {
                        maxAge: 60 * 60 * 24 * 30 * 1000, //30 days
                        httpOnly: true,
                    });
                    return res.json("User successfully registered"); 
                })
            }
        })
    })
}

exports.login = async (req, res) => {
    const { username, password } = req.body; 

    db.query('CALL findEmployee(?)', username, async (err, found) => {
        if(found[0][0]){
            const hashedPassword = found[0][0].password
            const matched = await bcrypt.compare(password, hashedPassword)
            if(!matched) return res.status(400).json('Wrong username or password!')
            else {
                const User = {id: found[0][0].id, type: 'employee'}
                const token =  createToken(User)
                res.cookie("token", token, {
                    maxAge: 60 * 60 * 24 * 30 * 1000, //30 days
                    httpOnly: true,
                });
                return res.json('Employee logged in successfully!')
            }
        }
        else{
            db.query('CALL findAdmin(?)', username, async (err, found) => {
                if(found[0][0]){
                    const hashedPassword = found[0][0].password
                    const matched = await bcrypt.compare(password, hashedPassword)
                    if(!matched) return res.status(400).json('Wrong username or password!')
                    else {
                        const User = {id: found[0][0].id, type: 'admin'}
                        const token =  createToken(User)
                        res.cookie("token", token, {
                            maxAge: 60 * 60 * 24 * 30 * 1000, //30 days
                            httpOnly: true,
                        });
                        return res.json('Admin logged in successfully!')
                    }
                }
                else
                    return res.json('Wrong username!')
                } 
            ) 
        }
    }) 
}