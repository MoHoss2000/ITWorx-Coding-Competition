const express = require('express')
const db = require('../db/mysql')
const authenticateToken = require('../middleware/authenticate')
const {isEmployee} = require('../middleware/authorization')
const controllers = require ('../controllers/employee')

const router = new express.Router()

router.use(express.json())

//router.use(authenticateToken)
//router.use(isEmployee)

router.get('/badges', controllers.viewBadges)


router.post('/activities/submitActivity', controllers.submitActivity)

router.get('/activities/completed/:employeeID/:cycleID', controllers.viewCompletedTasks)

router.get('/activities/pending', controllers.viewPendingTasks)

router.get('/activities/toBeSubmitted', controllers.viewToBeSubmittedTasks)

router.get('/cycles/:employeeID', controllers.viewEmployeeCycles)

router.get('/profile/:id/:cycleID', controllers.viewEmployeeProfile)

router.get('/cycles/view', controllers.viewCycleDetails)

router.get('/achievments', controllers.viewAchievements)

router.get('/assignedActivities', controllers.getAssignedActivities)

router.get('/currentActivities/:employeeID', controllers.getCurrentActivities)

router.get('/myActivities',controllers.getActvivitiesEmployee)
module.exports = router