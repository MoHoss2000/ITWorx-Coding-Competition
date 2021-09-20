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


router.get('/cycle/activities/:cycleID', authenticateToken,async (req, res) => {
    const cycleID = req.params.cycleID
    try{
        const result = await proc.viewCycleActivities(cycleID)
        if(result.length === 0)
           res.status(400).send();
        res.json({ result })
    }catch(e){
            console.log(e)
            res.status(400).json({ error: err });
        }
});


router.patch('/changepassword', controllers.changePassword)
router.patch('/newpassword', controllers.newPassword)


// sends reset password link to email
router.post('/resetPassword', controllers.resetPassword);




module.exports = router