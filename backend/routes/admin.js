const express = require('express')
const { db, sequelize } = require('../db/mysql')
const { Cycle, Badge } = require('../models/index')
const authenticateToken = require('../utils/authenticate')

const router = express.Router()
router.use(express.json())

function checkAdmin(req,res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded);
        if(decoded.user_type == 'admin'){
            req.userData = decoded;
            next();
        } else {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
} 

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



module.exports = router