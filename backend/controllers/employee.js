const {Employee, Cycle, EmployeeBadges, EmployeeActivity, EmployeeCycle} = require('../models')
const proc = require('../db/procedures')

exports.viewAchievements = async (req, res) => {
    employeeId = req.params.userid
    cycleId = req.params.cycleid

    const virtual_recognitions = proc.viewEmployeeCycleVirtualRecognition(employeeId, cycleId)
    const badges = proc.viewEmployeeCycleBadges(employeeId, cycleId)
    return res.json({virtual_recognitions, badges})
}   
    
           

