const express = require('express')
const bcrypt = require("bcrypt");
const { Employee } = require("../models/employee");
const db = require('../db/mysql')

const router = new express.Router()
router.use(express.json())

router.post("/register", (req, res) => {
    // we take the input enetered by the user from the request
    const { first_name, last_name, username, password , is_developer} = req.body;
    // we hash the password and then create an entry in the db with the hashed password
    bcrypt.hash(password, 10).then((hash)=>{
        Employee.create({
            firt_name: first_name,
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
    console.log('tt')
    const { username, password } = req.body; 
    //Asyn: Wait till you find one employee in  db with this username
    const employee = await Employee.findOne({where :{ username: username}});
    if(!employee){ //employee not found
        res.status(400).json({error: "User Not Found"});
    }
    else{
        const databasePassword = user.password; // Hashed Password in DB
        bcrypt.compare(password, databasePassword). then((matched) =>{ 
            if (!matched) {
                res
                .status(400)
                .json({ error: "Username or Password is incorrect" });
            } else {
                //create token , JWT
            }
         })
         res.json("Employee logged in successfully")
    }
        
})

module.exports = router