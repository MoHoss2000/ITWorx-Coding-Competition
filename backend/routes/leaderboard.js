const express = require('express')
const db = require('../db/mysql')
const authenticateToken = require('../middleware/authenticate');


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

router.get('/practice/:cycleId', authenticateToken, async (req, res) => {
    const cycleId = req.params.cycleId
    try{
        const rank = (await sequelize.query(proc.viewPracticeRank(cycleId)))[0]
        res.send({ rank })
    }catch{
        res.sendStatus(400)
    }
})






module.exports = router