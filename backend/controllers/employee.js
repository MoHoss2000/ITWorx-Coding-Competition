const db = require('../db/mysql')
const { getActivities } = require('./admin')

exports.viewAchievements = async (req, res) => {
    const {employeeId,cycleID}  = req.body
    let result = {}
    db.query(
        'CALL viewEmployeeCycleVirtualRecognition(?,?)', 
        [employeeId, cycleID],
        (err, queryRes) => result.virtual_recognitions = queryRes
    )
    db.query(
        'CALL viewEmployeeCycleBadges(?,?)',
        [employeeId, cycleID],
        (err, queryRes) => result.badges = queryRes
        )
    return res.json({result})
}   
    
exports.viewCompletedTasks = async (req, res) => {
    cycleID= req.body.cycleID
    employeeID = req.id
    let result 
    db.query(
        'CALL viewCompletedTasks(?,?)', 
        [employeeID, cycleID],
        (err, queryRes) => result = queryRes
    )
    return res.json({result})
}

exports.viewPendingTasks = async (req, res) => {
    employeeId = req.id
    let result
    db.query(
        'CALL viewPendingTasks(?)', 
        [employeeId],
        (err, queryRes) => result = queryRes
    )
    return res.json({result})
}

exports.viewToBeSubmittedTasks = async (req, res) => {
    employeeId = req.id
    let result
    db.query(
        'CALL viewToBeSubmittedTasks(?)', 
        [employeeId],
        (err, queryRes) => result = queryRes
    )
    return res.json({result})
}

exports.viewEmployeeCycles = async (req, res) => {
    employeeId = req.id
    let result
    db.query(
        'CALL viewEmployeeCycles(?)', 
        [employeeId],
        (err, queryRes) => result = queryRes
    )
    return res.json({result})
}
           
exports.viewEmployeeProfile = async (req, res) => {
    cycleID= req.body.cycleID
    employeeID = req.id
    let result = {}
    db.query(
        'CALL viewEmployeePersonalInfo(?)', 
        [employeeId],
        (err, queryRes) => result.personalInfo = queryRes
    )
    //all badges? in current cycle only>
    db.query(
        'CALL viewEmployeeBadges(?)', 
        [employeeId],
        (err, queryRes) => result.employeeBadges = queryRes
    )
    db.query(
        'CALL viewEmployeePractice(?)', 
        [employeeId],
        (err, queryRes) => result.employeePractice = queryRes
    )
    db.query(
        'CALL viewEmployeeCycleVirtualRecognition(?,?)', 
        [employeeId, cycleID],
        (err, queryRes) => result.virtual_recognitions = queryRes
    )
    return res.json({result})
}

exports.viewCycleDetails = async (req, res) => {
    cycleID= req.body.cycleID
    employeeID = req.body.id
    let result 
    db.query(
        'CALL viewCycleDetailsForEmployee(?,?)', 
        [employeeID,cycleID ],
        (err, queryRes) => {
            result = queryRes[0]
            return res.json({result})
        })   
}

exports.getAssignedActivities = async (req, res) => {
    cycleID= req.body.cycleID
    employeeID = req.body.employeeID
    db.query(
        'CALL viewEmployeeActivitiesInCycle(?,?)', 
        [employeeID,cycleID ],
        (err, queryRes) => {
            result = queryRes[0]
            return res.json({result})
        })     
}

exports.submitActivity = async (req, res) => {
    const {employeeId,activityId, cycleID } = req.body
    let result
    db.query(
        'CALL submitActivity(?,?,?)', 
        [activityId, employeeId,cycleID ],
        (err, queryRes) => {
            result = queryRes[0]
            return res.json({result})
        })
}