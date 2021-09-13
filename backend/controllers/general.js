const {sendEmail} = require('../utils/email');
const jwt = require("jsonwebtoken");
const db = require('../db/mysql');
const bcrypt = require('bcrypt');
const { createToken } = require ('../utils/tokens');

exports.changePassword = async (req, res) => {
    const  id = req.id
    const userType = req.userType
    const { oldPassword, newPassword } = req.body
    if(oldPassword === newPassword) 
        return res.status(400).json({message: 'Old password and new password have to be different'})
    const findUser = userType == 'employee' ? `SELECT * FROM employee WHERE id = ${id}` : 
                                               `SELECT * FROM admin WHERE id = ${id}`
    db.query(findUser, async (err, user) => {
        const hashedPassword = user[0].password
        const match = await bcrypt.compare(oldPassword, hashedPassword)
        if(!match) return res.status(400).json({message: 'Old password is incorrect'})
        const newHashedPassword = await bcrypt.hash(newPassword, 10)
        const updateUser = userType === 'employee' ? `UPDATE employee SET password = ? WHERE id = ${id};`
                                                   : `UPDATE admin SET password = ? WHERE id = ${id};`
        db.query(updateUser, newHashedPassword,(err, result) => {
            if(result)
                return res.json({message: 'Password changed successfylly!'})
            res.status(400).send(err)
        })  
    })
}

exports.resetPassword = async (req, res) => {
    const { email } = req.body
    //check if a user with this email exists 
    let userID
    let userType
    let first_name

    const searchEmployee = new Promise((resolve, reject) => 
        db.query('SELECT * FROM Employee WHERE username = ?', email, (err, result) => {
            if (err)
                reject(err)
            else 
                resolve(result)
        }))

    const searchAdmin = new Promise((resolve, reject) => 
        db.query('SELECT * FROM Admin WHERE username = ?', email, (err, result) => {
            if (err)
                reject(err)
            else 
                resolve(result)
        }))

    let result = await searchEmployee
    if(result.length != 0){
        userID = result[0].id
        first_name = result[0].first_name
        userType = 'employee'
    }else{
        result = await searchAdmin
        if(result.length != 0){
            userID = result[0].id
            first_name = result[0].first_name
            userType = 'admin'
        }
        else
            return res.status(400).json({message: 'Worng username!'})
    }
    const token = jwt.sign ({ id: userID, type: userType }, process.env.Reset_Password, {expiresIn: '15m'})
        // generate URL to be sent in email (body)
        const url = "http://localhost:8080/changePassword/" + token
        // call sendEmail
        const subject = "ITWORX Reset Password"
        const body = `  <h3> Hello ${first_name} </h3>
                        <h4> Please click down below to reset your password </h4>
                        <br>
                        <a href= ${url}> Click Here </a>`
        sendEmail(email, subject, body)   
        res.json({messgae: 'Email sent successfully!'})             
}

exports.newPassword = async (req,res) =>{
    const token = req.params.token
    const newPassword = req.body.password
    let updateUser
    jwt.verify(token, process.env.Reset_Password, (err, data) => {
        if (err)
            return res.status(400).json({ message: "Token is incorrect or expired"})

        updateUser = data.type === 'employee' ? `UPDATE Employee SET password = ? WHERE id = ${data.id};`
                                              : `UPDATE Admin SET password = ? WHERE id = ${data.id};`
    })
    const newHashedPassword = await bcrypt.hash(newPassword, 10)
    db.query(updateUser, newHashedPassword, (err, result) => {
        if(err)
            return res.status(400).json(err)
        res.json({message: 'Password changed successfylly!'})
    })
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
        console.log(found)
        if(found){
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
                if(found){
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

exports.getDeadline = async (req, res) =>{
    db.query('CALL getDeadline()', 
        (err, result) => {
            if(result && result[0])
                return res.send(result[0])
            else if (err)
                return res.send({err}) 
            else 
                return res.send([])    
        }
    )
}