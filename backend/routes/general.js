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

router.post('/register', controllers.register);

router.post("/login", controllers.login)

router.get('/time', controllers.getDeadline)

router.patch('/changepassword', authenticateToken, controllers.changePassword)

router.get('/cycle/activities/:cycleID', authenticateToken,async (req, res) => {
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

router.get('/resetPassword', authenticateToken,(req, res) => {
    //Form to enter email
});

router.post('/resetPassword', controllers.resetPassword);

router.get('/newPassword/:token', (req, res) => {
    //Form to enter new Password 
});
router.post('/newPassword/:token', controllers.newPassword);



module.exports = router