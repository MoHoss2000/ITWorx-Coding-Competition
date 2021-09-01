const express = require('express')
const bcrypt = require("bcrypt");
const db = require('../db/mysql')
const {createToken} = require ('../utils/tokens')
const authenticateToken = require('../middleware/authenticate')
const controllers = require ('../controllers/general')
const cookieParser = require("cookie-parser");

const router = new express.Router()

router.use(express.json())
router.use(cookieParser())
router.use(authenticateToken)

router.get('/test', async (req, res) => {
    let sum
    console.log("Hi")
    const result= proc.totalGainedPoints(2)
    for (p in result){
        console.log(p)
          sum += p
    }
    console.log(sum)
    return
})

router.post("/register", async (req, res) => {
    // we take the input enetered by the user from the request
    const { first_name, last_name, username, password , is_developer, is_admin} = req.body;

    if(is_admin){ //register as admin
        //check to see if an admin with the same username exists
        const adminUser = await Admin.findOne({where :{ username: username}});
        if(adminUser) //username exists
            res.status(400).json({error: "Username exists"});
        else{
            bcrypt.hash(password, 10).then((hash)=>{
            const admin = Admin.create({
                          first_name: first_name,
                          last_name: last_name,
                          username: username,
                          password: hash,
                          is_developer: is_developer
                }). then(()=> {
                    admin.type = 'admin'
                    console.log(admin)
                    const token = createToken(admin);
                    //creating the cookie and saving it in the user's browser
                    res.cookie("token", token, {
                        maxAge: 60 * 60 * 24 * 30 * 1000, //30 days
                        httpOnly: true,
                    });
                    res.json("User successfully registered");
                }).catch((err) => {
                    if (err) {
                      res.status(400).json({ error: err });
                    } 
                });
            }); 
        }  
    }
    else{
        const employeeUser = await Employee.findOne({where :{ username: username}});
        if(employeeUser) //employee username exists
            res.status(400).json({error: "Username exists"});
            // we hash the password and then create an entry in the db with the hashed password
            bcrypt.hash(password, 10).then((hash)=>{
            const employee = Employee.create({
                             first_name: first_name,
                             last_name: last_name,
                             username: username,
                             password: hash,
                             is_developer: is_developer
                }). then(() => { 
                    employee.type = 'employee'
                    const token = createToken(employee);
                    //creating the cookie and saving it in the user's browser
                    res.cookie("token", token, {
                        maxAge: 60 * 60 * 24 * 30 * 1000, //30 days
                        httpOnly: true,
                    });
                    res.json("User successfully registered");
                }).catch((err) => {
                    if (err) {
                    res.status(400).json({ error: err });
                    } 
                });
            });  
        } 
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
                employee.type = 'employee'
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
                        admin.type = 'admin'
                        const token = createToken(admin);
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


router.patch('/changepassword', controllers.changePassword)


router.get('/cycle/activities/:cycleID', async (req, res) => {
    const cycleID = req.params.cycleID
    try{
        const result = await proc.viewCycleActivities(cycleID)
        if(result.length === 0)
           res.status(400).send()
        res.json({ result })
    }catch(e){
            console.log(e)
            res.status(400).json({ error: err });
        }
});

router.get('/resetPassword', (req, res) => {
    //Form to enter email
});

router.post('/resetPassword', controllers.resetPassword );

router.get('/newPassword/:token', (req, res) => {
    //Form to enter new Password 
});
router.post('/newPassword/:token', controllers.newPassword);


// router.get("/logout", (req, res) => {
//       res.clearCookie('token');
//       return res.redirect('/login');
//   });


module.exports = router