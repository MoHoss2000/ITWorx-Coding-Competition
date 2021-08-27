const express = require('express')
const { db, sequelize } = require('../db/mysql')
const { Employee, Activity, EmployeeActivity} = require('../models/index')
const { viewCompletedTasks, viewEmployeeCycles } = require('../db/procedures')

const router = new express.Router()
router.use(express.json())

router.get('/tasks/completed/:id', async (req, res) => {
    try{
        const result = await sequelize.query(viewCompletedTasks(req.params.id))
        res.send(result)
    }
    catch(e){
        console.log(e)
    }
})

router.get('/cycles/:id', async (req, res) => {
    try{
        const result = await sequelize.query(viewEmployeeCycles(req.params.id))
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(400).send()
    }
})

router.get('/profile/:id', async (req, res) => {
    

})

module.exports = router