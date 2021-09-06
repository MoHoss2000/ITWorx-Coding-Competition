const express = require('express')
const db = require('../db/mysql')
const authenticateToken = require('../middleware/authenticate');
const {isAdmin} = require('../middleware/authorization')


const router = new express.Router()
router.use(express.json())
// router.use(authenticateToken)
// router.use(isAdmin)

router.post('/employee', async (req, res) => {
    const {cycleID} = req.body
    db.query('CALL getEmployeeRankings(?)', cycleID, (err, result) => {
        if(result && result[0]){
            return res.send(result[0])
        }
        return res.status(400).send()
    })
})

router.get('/department', async (req, res) => {


})

// router.get('/practice/:cycleId', authenticateToken, async (req, res) => {
//     const cycleId = req.params.cycleId
//     try{
//         const rank = (await sequelize.query(proc.viewPracticeRank(cycleId)))[0]
//         res.send({ rank })
//     }catch{
//         res.sendStatus(400)
//     }
// })






module.exports = router