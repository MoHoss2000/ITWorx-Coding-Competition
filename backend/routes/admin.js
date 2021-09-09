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

router.post('/cycle', (req, res) => {
    var startDate = req.body.start_date;
    var endDate = req.body.end_date;
    var adminID =  req.userData.id;

    console.log(adminID);

    Cycle.create({
        start_date: startDate,
        end_date: endDate,
        AdminId: adminID,
        current: 1
    }). then((newCycle)=> {
        console.log(newCycle);
        res.status(200).json({message: 'Cycle created successfully', data: newCycle});
    }).catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        } 
    });
})

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