const db = require('../db/mysql')

exports.viewPracticerank = async (req, res) => {
    const cycleID = parseInt(req.params.cycleID)
    db.query('CALL viewPracticeRanking(?)', cycleID, (err, result) => {
        if(result && result[0])
            return res.send(result[0])

        else if(err)
            return res.status(400).send(err)    

        else
            return res.send([])
            
    })
}

exports.viewEmployeeRanking = async (req, res) => {
    const cycleID = parseInt(req.params.cycleID)
    db.query('CALL getEmployeeRankings(?)', cycleID, (err, result) => {
        if(result && result[0]){
            return res.send(result[0])
        }else if(err){
            console.log(err)
            return res.status(400).send()
        } 
        else{
            console.log('hena')
            return res.send([])
        }   
    })
}

exports.viewDepartmentRanking = async (req, res) => {
    const cycleID = parseInt(req.params.cycleID)
    db.query('CALL getDepartmentRankings(?)', cycleID, (err, result) => {
        if(result && result[0])
            return res.send(result[0])

        else if(err)
            return res.status(400).send(err)

        else
            return res.send([])
    })
}