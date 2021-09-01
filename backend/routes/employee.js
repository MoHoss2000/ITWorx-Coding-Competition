const express = require('express')
const db = require('../db/mysql')
const authenticateToken = require('../utils/authenticate')
const {isEmployee} = require('../utils/authorization')
const controllers = require ('../controllers/employee')

const router = new express.Router()

router.use(express.json())
router.use(authenticateToken)
router.use(isEmployee)

router.get('/activities/completed/:cycleID', controllers.viewCompletedTasks)

router.get('/activities/pending', controllers.viewPendingTasks)

router.get('/activities/toBeSubmitted', controllers.viewToBeSubmittedTasks)

router.get('/cycles', controllers.viewEmployeeCycles)

router.get('/profile', controllers.viewEmployeeProfile)

router.get('/cycles/view/:cycleId', controllers.viewCycleDetails)

router.get('achievments/:userid/:cycleid', controllers.viewAchievements)

router.get('/assignedActivities', controllers.getAssignedActivities)

module.exports = router