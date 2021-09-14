const { sendEmail } = require('../utils/email');
const jwt = require("jsonwebtoken");
const db = require('../db/mysql');
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/tokens');


function decodeResetPassToken(token) {
    // console.log("HEY");
    try {
        return jwt.verify(token, process.env.Reset_Password)
    }
    catch {
        return null;
    }
}

exports.changePassword = async (req, res) => {
    // console.log(req);
    var resetPasswordToken = req.body.token;
    var id = req.id
    var userType = req.userType

    if (resetPasswordToken) {
        var payload = decodeResetPassToken(resetPasswordToken);

        if (payload == null)
            return res.status(400).send('Invalid or expired token');


        id = payload.id;
        userType = payload.type;
    }


    const { oldPassword, newPassword } = req.body
    if (oldPassword === newPassword)
        return res.status(400).send('Old password and new password have to be different')
    const findUser = userType == 'employee' ? `SELECT * FROM employee WHERE id = ${id}` :
        `SELECT * FROM admin WHERE id = ${id}`

    db.query(findUser, async (err, user) => {

        const hashedPassword = user[0].password
        const match = await bcrypt.compare(oldPassword, hashedPassword)
        if (!match) return res.status(400).json({ message: 'Old password is incorrect' })
        const newHashedPassword = await bcrypt.hash(newPassword, 10)
        const updateUser = userType === 'employee' ? `UPDATE employee SET password = ? WHERE id = ${id};`
            : `UPDATE admin SET password = ? WHERE id = ${id};`
        db.query(updateUser, newHashedPassword, (err, result) => {
            if (result)
                return res.status(200).send('Password changed successully!')
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
        db.query('SELECT * FROM employee WHERE username = ?', email, (err, result) => {
            if (err)
                reject(err)
            else
                resolve(result)
        }))

    const searchAdmin = new Promise((resolve, reject) =>
        db.query('SELECT * FROM admin WHERE username = ?', email, (err, result) => {
            if (err)
                reject(err)
            else
                resolve(result)
        }))

    let result = await searchEmployee;
    if (result.length != 0) {
        userID = result[0].id
        first_name = result[0].first_name
        userType = 'employee'
    } else {
        result = await searchAdmin
        if (result.length != 0) {
            userID = result[0].id
            first_name = result[0].first_name
            userType = 'admin'
        }
        else {
            return res.status(400).send('Invalid username!')
        }
    }

    const token = jwt.sign({ id: userID, type: userType }, process.env.Reset_Password, { expiresIn: '15m' })
    // generate URL to be sent in email (body)
    const url = "http://localhost:3000/resetpassword/" + token
    // call sendEmail
    const subject = "ITWORX Reset Password"
    const body = `  <h3> Hello ${first_name} </h3>
                        <h4> Please click down below to reset your password </h4>
                        <br>
                        <a href= ${url}>${url}</a>`
    sendEmail(email, subject, body);

    res.status(200).send({ message: 'Email sent successfully!' })
}

exports.newPassword = async (req, res) => {
    const token = req.params.token
    const newPassword = req.body.password
    let updateUser
    jwt.verify(token, process.env.Reset_Password, (err, data) => {
        if (err)
            return res.status(400).json({ message: "Token is incorrect or expired. Try requesting a new reset password email" })

        updateUser = data.type === 'employee' ? `UPDATE Employee SET password = ? WHERE id = ${data.id};`
            : `UPDATE Admin SET password = ? WHERE id = ${data.id};`
    })
    const newHashedPassword = await bcrypt.hash(newPassword, 10)
    db.query(updateUser, newHashedPassword, (err, result) => {
        if (err)
            return res.status(400).json(err)
        res.json({ message: 'Password changed successfully!' })
    })
}

exports.register = async (req, res) => {
    // we take the input enetered by the user from the request
    const { first_name, last_name, username, password, is_developer, is_admin } = req.body;
    const findUser = is_admin ? 'CALL findAdmin(?)' : 'CALL findEmployee(?)'
    const addUser = is_admin ? 'CALL addAdmin(?,?,?,?)' : 'CALL addEmployee(?,?,?,?,?)'

    db.query(findUser, username, async (err, found) => {
        if (found[0][0])
            return res.status(400).json({ error: "Username exists" })
        const hashedPassword = await bcrypt.hash(password, 10)
        const arrayOfData = is_admin ?
            [first_name, last_name, username, hashedPassword] :
            [first_name, last_name, username, hashedPassword, is_developer]
        console.log(arrayOfData, addUser)
        db.query(addUser, arrayOfData, (err, queryRes) => {
            if (queryRes) {
                db.query(findUser, username, (err, result) => {
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
            else return res.status(400).send(err)
        })
    })
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const getCurrentCycle = new Promise((resolve, reject) => {
        db.query('SELECT id FROM cycle WHERE current = 1', (err, result) => {
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
    db.query('CALL findEmployee(?)', username, async (err, found) => {
        if (found && found[0].length) {
            const hashedPassword = found[0][0].password
            const matched = await bcrypt.compare(password, hashedPassword)
            if (!matched) return res.status(400).json('Wrong username or password!')
            else {
                const cycleID = (await getCurrentCycle)[0].id
                let User = { id: found[0][0].id, type: 'employee' }
                const token = createToken(User)
                res.cookie("token", token, {
                    maxAge: 60 * 60 * 24 * 30 * 1000, //30 days
                    httpOnly: true,
                });
                return res.send({
                    message:'Employee logged in successfully!',
                    accessToken: token,
                    cycleID,
                    type: 'employee',
                    id: found[0][0].id
            })
            }
        }
        else {
            db.query('CALL findAdmin(?)', username, async (err, found) => {
                if (found && found[0].length) {
                    const hashedPassword = found[0][0].password
                    const matched = await bcrypt.compare(password, hashedPassword)
                    if (!matched) return res.status(400).json('Wrong username or password!')
                    else {
                        const cycleID = (await getCurrentCycle)[0].id
                        let User = { id: found[0][0].id, type: 'admin' }
                        const token = createToken(User)
                        res.cookie("token", token, {
                            maxAge: 60 * 60 * 24 * 30 * 1000, //30 days
                            httpOnly: true,
                        });
                        return res.send({
                            message:'Admin logged in successfully!',
                            accessToken: token,
                            cycleID,
                            type: 'admin',
                            id: found[0][0].id
                    })
                    }
                }
                else
                    return res.json('Wrong username!')
            }
            )
        }
    })
}

exports.getDeadline = async (req, res) => {
    db.query('CALL getDeadline()',
        (err, result) => {
            if (result && result[0])
                return res.send(result[0])
            else if (err)
                return res.send({ err })
            else
                return res.send([])
        }
    )
}