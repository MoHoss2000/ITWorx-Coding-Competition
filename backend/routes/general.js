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

router.patch('/changepassword/:id', controllers.changePassword)

router.patch('/newpassword', controllers.newPassword)

// sends reset password link to email
router.post('/resetPassword', controllers.resetPassword);




module.exports = router