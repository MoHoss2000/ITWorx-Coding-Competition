const db = require('../db/mysql')


exports.viewBadges = async (req, res) => {
    const {employeeId, cycleId} = req.query
    const badges = new Promise((resolve, reject) => {
        db.query('SELECT * FROM Badge', (err, result) => {
            // console.log(result);
            if (err)
                reject(err)
            else
                resolve(result)
        })
    })

    const employeePointsInCycle = new Promise((resolve, reject) => {
        db.query('CALL totalGainedPointsInCycle (?, ?)', [employeeId, cycleId], (err, result) => {
            if (err)
                reject(err)
            else
               resolve(result)
        })
    })

    try {
        // get all badges and sort them by points needed
        var allBadges = (await badges).sort((a, b) => a.points_needed - b.points_needed);

        // get employee points in the cycle
        var employeePoints = (await employeePointsInCycle)[0][0].points;
        console.log(employeePoints)

        // badges employee gained in the cycle (points needed <= his points in the same cycle)
        var gainedBadges = allBadges.filter((badge) => (badge.points_needed <= employeePoints) && badge.enabled);

        var nextBadge = allBadges.find((badge) => (badge.points_needed > employeePoints) && badge.enabled)

        res.status(200).json({
            message: 'Badges fetched successfully', gainedBadges: gainedBadges,
            pointsInCycle: employeePoints, nextBadge: nextBadge || 'Employee gained the last active badge'
        });

    } catch {
        res.status(400).send('An error occured');
    }
}

exports.viewAchievements = async (req, res) => {
    const employeeId = req.id
    const { cycleID } = req.body
    let result = {}
    db.query(
        'CALL viewEmployeeCycleVirtualRecognition(?,?)',
        [employeeId, cycleID],
        (err, queryRes) => {
            result.virtual_recognitions = queryRes[0]
            db.query(
                'CALL viewEmployeeCycleBadges(?,?)',
                [employeeId, cycleID],
                (err, queryRes) => {
                    result.badges = queryRes[0]
                    return res.send(result)
                }
            )
        }
    )
}

exports.viewCompletedTasks = async (req, res) => {
    const employeeID = parseInt(req.params.employeeID)
    const cycleID = parseInt(req.params.cycleID)
    let result
    db.query(
        'CALL getCompletedActivities(?,?)',
        [employeeID, cycleID],
        (err, result) => {
            if (result && result[0])
                res.send(result[0])
            else if (err)
                res.status(400).send(err)
            else
                res.send([])
        }
    )
}

exports.viewPendingTasks = async (req, res) => {
    const employeeID = req.id
    db.query(
        'CALL viewPendingTasks(?)',
        [employeeID],
        (err, queryRes) => {
            if (!err)
                return res.json(queryRes[0])
            else
                return res.status(400).json({ err })
        }
    )
}

exports.viewToBeSubmittedTasks = async (req, res) => {
    const employeeId = req.id
    db.query(
        'CALL viewToBeSubmittedTasks(?)',
        [employeeId],
        (err, queryRes) => {
            if (!err)
                return res.json(queryRes[0])
            else
                return res.status(400).json({ err })
        }
    )
}

exports.viewEmployeeCycles = async (req, res) => {
    const employeeId = parseInt(req.params.employeeID)
    console.log("hi" + employeeId)
    db.query(
        'CALL viewEmployeeCycles(?)',
        [employeeId],
        (err, result) => {
            if (result && result[0])
                return res.send(result[0])
            else if (err)
                return res.send({ err })
            else
                return res.send([])
        })
}

exports.viewEmployeeProfile = async (req, res) => {
    const employeeId = parseInt(req.params.id)
    const cycleID = parseInt(req.params.cycleID)
    console.log(employeeId)
    console.log(cycleID)
    let result = {}

    const personalInfo = new Promise((resolve, reject) => {
        db.query('CALL getemployeeInfo(?)', employeeId, (err, result) => {
            if (err)
                reject(err)
            else
                resolve(result)
        })
    })

    const departments = new Promise((resolve, reject) => {
        db.query('CALL viewEmployeeDepartments(?)', employeeId, (err, result) => {
            if (err)
                reject(err)
            else
                resolve(result)
        })
    })

    const badges = new Promise((resolve, reject) => {
        db.query('CALL viewEmployeeBadges(?)', employeeId, (err, result) => {
            if (err)
                reject(err)
            else
                resolve(result)
        })
    })

    const practice = new Promise((resolve, reject) => {
        db.query('CALL viewEmployeePractice(?)', employeeId, (err, result) => {
            if (err)
                reject(err)
            else
                resolve(result)
        })
    })

    const virtual_recognitions = new Promise((resolve, reject) => {
        db.query('CALL viewEmployeeCycleVirtualRecognition(?,?)', [employeeId, cycleID], (err, result) => {
            if (err)
                reject(err)
            else
                resolve(result)
        })
    })

    try {
        result.personalInfo = (await personalInfo)[0]
    } catch (e) {
        result.personalInfo = []
    }
    try {
        result.badges = (await badges)[0]
    } catch (e) {
        result.badges = []
    }
    try {
        result.practice = (await practice)[0]
    } catch (e) {
        result.practice = []
    }
    try {
        result.virtual_recognitions = (await virtual_recognitions)[0]
    } catch (e) {
        result.virtual_recognitions = []
    }
    try {
        result.departments = (await departments)[0]
    } catch (e) {
        departments = []
    }

    res.send(result)

}

exports.viewCycleDetails = async (req, res) => {
    const cycleID = req.body.cycleID
    const employeeID = req.id
    db.query(
        'CALL viewCycleDetailsForEmployee(?,?)',
        [employeeID, cycleID],
        (err, queryRes) => {
            if (!err)
                return res.json(queryRes[0])
            else
                return res.status(400).json({ err })
        })
}

exports.getAssignedActivities = async (req, res) => {
    const cycleID = req.params.cycleID
    const employeeID = req.params.employeeID
    db.query(
        'CALL viewEmployeeActivitiesInCycle(?,?)',
        [employeeID, cycleID],
        (err, queryRes) => {
            if (!err)
                return res.json(queryRes[0])
            else
                return res.status(400).json({ err })
        })
}

exports.submitActivity = async (req, res) => {
    
    const {activityId,  employeeId, cycleID } = req.body
   
    db.query(
        'CALL submitActivity(?,?,?)', 
        [activityId,employeeId,cycleID],
        (err, queryRes) => {
            if(!err){
                console.log(queryRes)
                return res.json(queryRes)}
            else
                return res.status(400).json({ err })
        })
}

exports.getCurrentActivities = async (req, res) => {
    const employeeID = parseInt(req.params.employeeID)
    db.query(
        'CALL viewCurrentTasks(?)',
        [employeeID],
        (err, result) => {
            if (result && result[0])
                return res.send(result[0])
            else if (err)
                return res.send({ err })
            else
                return res.send([])
        })
}

exports.getActvivitiesEmployee = async (req, res) => {
    const { employeeId, cycleId } = req.query
    if (!(employeeId && cycleId)) {
        res.status(400).send({
            message: "Please provide all input fields!"
        });
        return;
    }

    db.query(`CALL getActivitiesEmployee(?,?)`, [employeeId, cycleId], (err, result) => {
        if (result) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send(err);
        }
             
      })
    
  }
  exports.getAllActivities = async (req, res) => {
    const {employeeId, cycleId}= req.query
       if(!(employeeId && cycleId)){
        res.status(400).send({
          message: "Please provide all input fields!"
        });
        return;
       }
   
      db.query(`CALL getAllActivities(?,?)`,[employeeId, cycleId],(err, result) => {
        if(result){
          res.status(200).send(result);
        }
        else{
          res.status(400).send(err);
        }
             
      })
    
  }
  exports.assignEmployeeToActivity= async (req, res) => {

    const { EmployeeId , ActivityId , CycleId } = req.body

    if(!(EmployeeId && ActivityId && CycleId)){

      res.status(400).send({
          message: "Please provide all input fields!"
        })
        return
}
  const employeeActivity=[EmployeeId, ActivityId, CycleId]

   db.query('CALL enrollInActivity(?,?,?);', employeeActivity ,(err, result) => {
    if(result){
        res.status(200).json('You have Successfully enrolled in this activity');    
    }
    else{
      res.status(400).send(err)
    }
  })
  
}
