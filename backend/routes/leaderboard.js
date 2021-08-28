const express = require('express')
const { Employee } = require("../models/employee");
const { EmployeeActivity } = require('../models/employeeActivity');
const { Activity } = require('../models/activity');
const { db, sequelize } = require('../db/mysql')
const authenticateToken = require('../utils/authenticate');
const proc = require('../db/procedures')

const router = new express.Router()
router.use(express.json())

router.get("/employee", async (req, res) => {
    try { 
        const result = await Employee.findAll({ 
        attributes: ["", ""], 
        include: [ 
            { 
                model: EmployeeActivity, 
                // attributes: ['employeeId'], 
                required: true, 
            }, 
            { 
                model: Activity,     
                // attributes: ["employee"], 
                required: true, 
            }, 
        ], 
    }); 
        res.status(status).json(result); 
    } catch (err) { 
        res.status(400).json(err); 
    } 
});

router.get('/department', async (req, res) => {


})

router.get('/practice', authenticateToken, async (req, res) => {
    try{
        const rank = (await sequelize.query(proc.viewPracticeRank()))[0]
        res.send({rank})
    }catch{
        res.sendStatus(400)
    }
})






module.exports = router