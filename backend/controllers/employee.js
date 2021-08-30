const {Employee, Cycle, EmployeeBadges, EmployeeActivity, EmployeeCycle} = require('../models')
const proc = require('../db/procedures')

exports.viewAchievements = async (req, res) => {
    employeeId = req.params.userid
    cycleId = req.params.cycleid

    const virtual_recognitions = proc.viewEmployeeCycleVirtualRecognition(employeeId, cycleId)
    const badges = proc.viewEmployeeCycleBadges(employeeId, cycleId)
    return res.json({virtual_recognitions, badges})
}   
    
exports.viewCompletedTasks = async (req, res) => {
    try{
        const result = await proc.viewCompletedTasks(req.id, req.params.cycleID)
        res.send(result)
    }
    catch(e){
        console.log(e)
    }
}

exports.viewPendingTasks = async (req, res) => {
    try{
        const result = await proc.viewPendingTasks(req.id)
        res.send(result)
    }
    catch(e){
        console.log(e)
    }
}

exports.viewToBeSubmittedTasks = async (req, res) => {
    try{
        const result = await proc.viewToBeSubmittedTasks(req.id)
        res.send(result)
    }
    catch(e){
        console.log(e)
    }
}

exports.viewEmployeeCycles = async (req, res) => {
    const id = req.id
    try{
        const result = await proc.viewEmployeeCycles(id)
        res.send({result})
    }catch{
        res.status(400).send()
    }
}
           
exports.viewEmployeeProfile = async (req, res) => {
    const id = req.id
    try{
        const personalInfo = (await sequelize.query(proc.viewEmployeePersonalInfo(id)))[0]
        const employeeDepartments = (await sequelize.query(proc.viewEmployeeDepartment(id)))[0]
        const employeePractice = (await sequelize.query(proc.viewEmployeePractice(id)))[0]
        res.send({personalInfo, employeeDepartments, employeePractice})
    }catch{
        res.status(400).send()
    }
}

exports.viewCycleDetails = async (req, res) => {
    const empID = req.id
    const cycleID = req.params.cycleId
    try{
        const result = await proc.viewCycleDetailsForEmployee(empID, cycleID)
        if(result.length === 0)
            res.status(404).send()
        res.json({ result })
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
}
