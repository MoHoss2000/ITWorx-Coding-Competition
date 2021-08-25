const express = require('express')
const db = require('../db/mysql')

const router = new express.Router()
router.use(express.json())

router.get('/employee/tasks/completed/:id', (req, res) => {
    const id = req.params.id
    db.query('CALL viewCompletedTasks(?)', [id], (err, response) => {
        if(err)
            res.status(500).send()
        res.send(response[0])
    })
})

module.exports = router