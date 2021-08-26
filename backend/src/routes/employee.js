const express = require('express')
const { db, sequelize } = require('../db/mysql')

const router = new express.Router()
router.use(express.json())

router.get('/employee/tasks/completed/:id', async (req, res) => {
    const id = req.params.id
    // db.query('CALL viewCompletedTasks(?)', [id], (err, response) => {
    //     if(err)
    //         res.status(500).send()
    //     res.send(response[0])
    // })
    try{
        const result = await sequelize.query('call test()')
        console.log(result)
        res.send(result)
    }
    catch(e){
        console.log(e)
    }
    
    

})

module.exports = router