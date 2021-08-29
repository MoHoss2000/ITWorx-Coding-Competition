const express = require('express')
const { db, sequelize } = require('../db/mysql')
const { Employee, Activity, EmployeeActivity } = require('../models/index')
const proc = require('../db/procedures')
const authenticateToken = require('../utils/authenticate')

const router = new express.Router()
router.use(express.json())

router.get('/tasks/completed', authenticateToken, async (req, res) => {
    try{
        const result = await sequelize.query(proc.viewCompletedTasks(req.id))
        res.send(result)
    }
    catch(e){
        console.log(e)
    }
})

router.get('/cycles', authenticateToken, async (req, res) => {
    const id = req.id
    try{
        const result = (await sequelize.query(proc.viewEmployeeCycles(id)))[0]
        res.send({result})
    }catch{
        res.status(400).send()
    }
})

router.get('/profile', authenticateToken, async (req, res) => {
    const id = req.id
    try{
        const personalInfo = (await sequelize.query(proc.viewEmployeePersonalInfo(id)))[0]
        const employeeDepartments = (await sequelize.query(proc.viewEmployeeDepartment(id)))[0]
        const employeePractice = (await sequelize.query(proc.viewEmployeePractice(id)))[0]
        res.send({personalInfo, employeeDepartments, employeePractice})
    }catch{
        res.status(400).send()
    }
})

router.get('/cycles/view/:cycleId', authenticateToken, async (req, res) => {
    const empID = req.id
    const cycleID = req.params.cycleId
    try{
        const result = (await sequelize.query(proc.viewCycleDetailsForEmployee(empID, cycleID)))[0]
        if(result.length === 0)
            res.status(404).send()
        res.json({ result })
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router