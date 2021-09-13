const express = require('express')
const db = require('../db/mysql')
const authenticateToken = require('../middleware/authenticate')
const controllers = require('../controllers/admin')
const { isAdmin } = require('../middleware/authorization')

const router = express.Router()
router.use(express.json())
//router.use(authenticateToken)
//router.use(isAdmin)
router.get('/profile/:id', controllers.viewProfile)

router.post('/newCycle',controllers.createNewCycle)

router.post('/badge', controllers.createBadge);

router.get('/getActivities/:cycleID', controllers.getActivities)

router.get('/Activities', controllers.getAllActivities)

router.get('/viewActivity', controllers.activityInfo)

router.get('/viewEmployeeActivity', controllers.getEmployeesActivity)

router.get('/pending', controllers.pendingActivities)
router.get('/pending/:cycleID', controllers.pendingActivities)

router.post('/newActivity', controllers.createNewActivity)

router.post('/editActivity', controllers.editActivity)

router.post('/assignActivity', controllers.assignEmployeeToActivity)

router.post('/markActivityAsComplete', controllers.markActivityAsComplete)

router.post('/removeActivityCompletion', controllers.removeActivityCompletion)

router.get('/badges', controllers.getBadges);

router.get('/cycles', controllers.getCycles)

router.patch('/badge/:badgeID', controllers.updateBadge);

router.get('/cycle/participants/:cycleID', controllers.viewParticipants)

router.get('/participants/excelfile', controllers.exportToExcelParticipants)

router.patch('/cycle/disable/:cycleID', controllers.disableCycle)

router.get('/employeeStatus/:employeeId/:cycleID', controllers.viewEmployeeStatus)

router.get('/cycle/view/:cycleID', controllers.cycleInfo)




//router.get('/leaderboard/excelfile', exportToExcelLeaderboard)

module.exports = router