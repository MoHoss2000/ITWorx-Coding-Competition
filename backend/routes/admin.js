const express = require('express')
const { db, sequelize } = require('../db/mysql')
const { Cycle, Badge } = require('../models/index')
const authenticateToken = require('../utils/authenticate')
const proc = require('../db/procedures')
const {viewParticipants, exportToExcelParticipants} = require('../controllers/admin')

const router = express.Router()
router.use(express.json())

//const {authenticateToken} = require ('../utils/authenticate')

// create new cycle
router.post('/cycle', /*checkAdmin,*/ (req, res) => {
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

router.post('/badge', /*checkAdmin,*/ (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var type = req.body.type;
    var pointsNeeded = req.body.points_needed;
    // var adminID =  req.userData.id;

    Badge.create({
        name: name,
        description: description,
        type: type,
        points_needed: pointsNeeded,
        enabled: 1
    }). then((newBadge)=> {
        console.log(newBadge);
        res.status(200).json({message: 'Badge created successfully', data: newBadge});
    }).catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        } 
    });
})

router.get('/badge/view', authenticateToken, async (req, res) => {
    try{
        const result = await Badge.findAll()
        res.send(result)  
        
    }catch (error) {
        res.status(400).json({ error: err });
    }

});

router.get('/cycles/view', authenticateToken, async (req, res) => {
    try{
        const result = await Cycle.findAll()
        res.send(result)  
        
    }catch (error) {
        res.status(400).json({ error: err });
    }
})

router.patch('/badge/:badgeID', /*checkAdmin,*/ async (req, res) => {
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


router.get('/cycle/participants/:cycleID', authenticateToken, viewParticipants)

router.get('/participants/excelfile', authenticateToken, exportToExcelParticipants)

//router.get('/leaderboard/excelfile', authenticateToken, exportToExcelLeaderboard)

module.exports = router