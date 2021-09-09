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

router.post('/cycle', controllers.createCycle)

router.post('/badge', controllers.createBadge);

router.get('/getActivities/:cycleID', controllers.getActivities)

router.get('/viewActivity', controllers.activityInfo)

router.get('/pending', controllers.pendingActivities)

router.post('/newActivity', controllers.createNewActivity)

router.post('/editActivity', controllers.editActivity)

router.post('/assignActivity', controllers.assignEmployeeToActivity)

router.post('/markActivityAsComplete', controllers.markActivityAsComplete)

router.post('/removeActivityCompletion', controllers.removeActivityCompletion)

router.get('/badges', controllers.getBadges);

router.get('/cycles', controllers.getCycles)

router.patch('/badge/:badgeID', async (req, res) => {
    var badgeID = req.params.badgeID;
    console.log(req.body);

    try{
        await Badge.update(
            req.body, 
            {
                where: {
                    id: badgeID
                }
            }
        );

        res.status(200).json({message: 'Badge info updated successfully'});
    } catch(e) {
        res.status(400).json({ error: err });
    }
});

router.get('/cycle/participants/:cycleID', controllers.viewParticipants)

router.get('/participants/excelfile', controllers.exportToExcelParticipants)

router.patch('/cycle/disable/:cycleID', controllers.disableCycle)

router.get('/employeeStatus/:employeeId', controllers.viewEmployeeStatus)

router.get('cycle/view/:cycleID', controllers.cycleInfo)




//router.get('/leaderboard/excelfile', exportToExcelLeaderboard)

module.exports = router