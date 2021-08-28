const express = require('express')
const bcrypt = require("bcrypt");
const { Employee, Admin } = require("../models");
const db = require('../db/mysql')

const router = new express.Router()
router.use(express.json())

const {createToken} = require ('../utils/tokens')

//A library to allow us to parse cookies
const cookieParser = require("cookie-parser");
router.use(cookieParser())

router.post("/register", async (req, res) => {
    // we take the input enetered by the user from the request
    const { first_name, last_name, username, password , is_developer} = req.body;

    
    const employeeUser = await Employee.findOne({where :{ username: username}});
    if(employeeUser) //username exists
        res.status(400).json({error: "Username exists"});

    const adminUser = await Admin.findOne({where :{ username: username}});
    if(adminUser) //username exists
        res.status(400).json({error: "Username exists"});

    // we hash the password and then create an entry in the db with the hashed password
    bcrypt.hash(password, 10).then((hash)=>{
        Employee.create({
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: hash,
            is_developer: is_developer
        }). then(()=> { // Another promise, to return a json response after the user has been added to the db
            res.json("User successfully registered");
        }).catch((err) => {
            if (err) {
              res.status(400).json({ error: err });
            } 
        });
    });   
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body; 

    //Asyn: Wait till you find one employee in  db with this username
    const employee = await Employee.findOne({where :{ username: username}});
    if(employee){ //employee found
        const databasePassword = employee.password; // Hashed Password in DB
        bcrypt.compare(password, databasePassword). then((matched) =>{ 
            if (!matched) {
                res.status(400).json({ error: "Username or Password is incorrect" });
            } else {
                const token = createToken(employee);
                //creating the cookie and saving it in the user's browser
                res.cookie("token", token, {
                    maxAge: 60 * 60 * 24 * 30 * 1000, //30 days
                    httpOnly: true,
                  });
                res.json("Employee logged in successfully")  
            }
        })
    }
    else{ // check if it's an admin 
        const admin = await Admin.findOne({where :{ username: username}});
            if(admin){ //admin found
                const databasePassword = admin.password; // Hashed Password in DB

                bcrypt.compare(password, databasePassword). then((matched) =>{ 
                    if (!matched) {
                        res.status(400).json({ error: "Username or Password is incorrect" });
                    } else {
                        const token = createToken(eadminmployee);
                        //creating the cookie and saving it in the user's browser
                        res.cookie("token", token, {
                            maxAge: 60 * 60 * 24 * 30 * 1000,
                            httpOnly: true,
                        });
                        res.json("Admin logged in successfully")  
                    }
                })
            }
            else {
                res.status(400).json({error: "User Not Found"});
            }
        }  
})

module.exports = router