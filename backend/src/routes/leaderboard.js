const express = require('express')
const { Employee } = require("../models/employee");
const { EmployeeActivity } = require('../models/employeeActivity');
const { Activity } = require('../models/activity');
const db = require('../db/mysql')

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






module.exports = router