const db = require('../db/mysql')

exports.viewAchievements = async (req, res) => {
    const employeeId = req.id
    const {cycleID}  = req.body
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
    const employeeID = req.id
    const {cycleID}  = req.body
    let result 
    db.query(
        'CALL viewCompletedTasks(?,?)', 
        [employeeID, cycleID],
        (err, queryRes) => {
            if(!err){
                result = queryRes[0]
                return res.json({result})
            }
            else
                return res.json({err}) 
        }
    )
}

exports.viewPendingTasks = async (req, res) => {
    const employeeID = req.id
    db.query(
        'CALL viewPendingTasks(?)', 
        [employeeID],
        (err, queryRes) => {
            if(!err)
                return res.json(queryRes[0])
            else
                return res.status(400).json({err}) 
        }
    )
}

exports.viewToBeSubmittedTasks = async (req, res) => {
    const employeeId = req.id
    db.query(
        'CALL viewToBeSubmittedTasks(?)', 
        [employeeId],
        (err, queryRes) => {
            if(!err)
                return res.json(queryRes[0])
            else
                return res.status(400).json({err}) 
        }
    )
}

exports.viewEmployeeCycles = async (req, res) => {
    const employeeId = req.id
    db.query(
        'CALL viewEmployeeCycles(?)', 
        [employeeId],
        (err, queryRes) => res.send(queryRes[0])
    )
}
           
exports.viewEmployeeProfile = async (req, res) => {
    const employeeId = parseInt(req.params.id)
    const cycleID  = parseInt(req.params.cycleID)
    
    let result = {}

    const personalInfo = new Promise((resolve, reject) => {
        db.query('CALL getemployeeInfo(?)', employeeId, (err, result) => {
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })

    const badges = new Promise((resolve, reject) => {
        db.query('CALL viewEmployeeBadges(?)', employeeId, (err, result) => {
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
    
    const practice = new Promise((resolve, reject) => {
        db.query('CALL viewEmployeePractice(?)', employeeId, (err, result) => {
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })

    const virtual_recognitions = new Promise((resolve, reject) => {
        db.query('CALL viewEmployeeCycleVirtualRecognition(?,?)', [employeeId, cycleID], (err, result) => {
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })

    try{
        const res1 = await personalInfo 
        //const res2 = await badges
        //const res3 = await practice
        //const res4 = await virtual_recognitions
    }catch(e){
        res.send(e)
    }
    
    console.log(res1)
    console.log(res2)
    console.log(res3)
    console.log(res4)

    //res.send('tmam')

}

exports.viewCycleDetails = async (req, res) => {
    const cycleID = req.body.cycleID
    const employeeID = req.id
    db.query(
        'CALL viewCycleDetailsForEmployee(?,?)', 
        [employeeID,cycleID ],
        (err, queryRes) => {
            if(!err)
                return res.json(queryRes[0])
            else
                return res.status(400).json({err}) 
        })   
}

exports.getAssignedActivities = async (req, res) => {
    const cycleID= req.body.cycleID
    const employeeID = req.id
    db.query(
        'CALL viewEmployeeActivitiesInCycle(?,?)', 
        [employeeID,cycleID ],
        (err, queryRes) => {
            if(!err)
                return res.json(queryRes[0])
            else
                return res.status(400).json({err}) 
        })     
}

exports.submitActivity = async (req, res) => {
    
    const {activityId, cycleID, employeeId } = req.body
   
    db.query(
        'CALL submitActivity(?,?,?)', 
        [activityId, employeeId, cycleID],
        (err, queryRes) => {
            if(!err)
                return res.json(queryRes[0])
            else
                return res.status(400).json({err}) 
        })
}