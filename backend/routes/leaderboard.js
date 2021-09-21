const express = require('express')
const db = require('../db/mysql')
const authenticateToken = require('../middleware/authenticate');
const {isAdmin} = require('../middleware/authorization')
const controllers = require ('../controllers/leaderboard')


const router = new express.Router()
router.use(express.json())

router.get('/employee/:cycleID', controllers.viewEmployeeRanking)

router.get('/department/:cycleID', controllers.viewDepartmentRanking)

router.get('/practice/:cycleID', controllers.viewPracticerank)


module.exports = router