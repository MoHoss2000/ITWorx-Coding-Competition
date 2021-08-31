const express = require('express')
const { db, sequelize } = require('../db/mysql')
const { Employee, Activity, EmployeeActivity, Cycle } = require('../models/index')
const proc = require('../db/procedures')
const authenticateToken = require('../utils/authenticate')
const controllers = require ('../controllers/employee')

const router = new express.Router()

router.use(express.json())

router.get('/activities/completed/:cycleID', authenticateToken, isEmployee, controllers.viewCompletedTasks)

router.get('/activities/pending', authenticateToken, controllers.viewPendingTasks)

router.get('/activities/toBeSubmitted', authenticateToken, controllers.viewToBeSubmittedTasks)

router.get('/cycles', authenticateToken, controllers.viewEmployeeCycles)

router.get('/profile', authenticateToken, controllers.viewEmployeeProfile)

router.get('/cycles/view/:cycleId', authenticateToken, controllers.viewCycleDetails)

router.get('achievments/:userid/:cycleid', authenticateToken, controllers.viewAchievements)


router.get('/assignedActivities', controllers.getAssignedActivities)

module.exports = router