const db = require('../db/mysql')

exports.viewAchievements = async (req, res) => {
    employeeId = req.params.userid
    cycleId = req.params.cycleid
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
    employeeId = req.id
    cycleId = req.params.cycleid
    let result 
    db.query(
        'CALL viewEmployeeCycleVirtualRecognition(?,?)', 
        [employeeId, cycleID],
        (err, queryRes) => result = queryRes
    )
}

exports.viewPendingTasks = async (req, res) => {
    employeeId = req.id
    let result
    db.query(
        'CALL viewPendingTasks(?)', 
        [employeeId],
        (err, queryRes) => result = queryRes
    )
}

exports.viewToBeSubmittedTasks = async (req, res) => {
    employeeId = req.id
    let result
    db.query(
        'CALL viewToBeSubmittedTasks(?)', 
        [employeeId],
        (err, queryRes) => result = queryRes
    )
}

exports.viewEmployeeCycles = async (req, res) => {
    employeeId = req.id
    let result
    db.query(
        'CALL viewEmployeeCycles(?)', 
        [employeeId],
        (err, queryRes) => result = queryRes
    )
}
           
exports.viewEmployeeProfile = async (req, res) => {
    employeeId = req.id
    let result = {}
    db.query(
        'CALL viewEmployeePersonalInfo(?)', 
        [employeeId],
        (err, queryRes) => result.personalInfo = queryRes
    )
    // badges of current cycle? - All badges
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
    // virtual recognition - but i need current cycle
    // db.query(
    //     'CALL viewEmployeeBadges(?)', 
    //     [employeeId],
    //     (err, queryRes) => result.employeeBadges = queryRes
    // )
}

exports.viewCycleDetails = async (req, res) => {
    const employeeId = req.id
    const cycleID = req.params.cycleId
    let result 
    db.query(
        'CALL viewCycleDetailsForEmployee(?,?)', 
        [employeeId,cycleID ],
        (err, queryRes) => result = queryRes
    )
}

//current cycle??
exports.getAssignedActivities = async (req, res) => {
    const id = req.id  
    let result   
  }

exports.submitActivity = async (req, res) => {
    employeeId = req.id
    activityId = req.id
    cycleID = 0 //Current cycle?
    let result
    db.query(
        'CALL submitActivity(?,?,?)', 
        [activityId, employeeId,cycleID ],
        (err, queryRes) => result = queryRes
    )
  }