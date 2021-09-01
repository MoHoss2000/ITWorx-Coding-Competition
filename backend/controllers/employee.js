const db = require('../db/mysql')

exports.viewAchievements = async (req, res) => {
    employeeId = req.params.userid
    cycleId = req.params.cycleid
    let result = {}
    db.query(
        'CALL viewEmployeeCycleVirtualRecognition(?,?)', 
        [employeeId, cycleID],
        (err, queryRes) => result.virtual_recognitions = queryRes
    )
    db.query(
        'CALL viewEmployeeCycleBadges(?,?)',
        [employeeId, cycleID],
        (err, queryRes) => result.badges = queryRes
        )
    return res.json({result})
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
        const personalInfo = await proc.viewEmployeePersonalInfo(id)
        const departments = await proc.viewEmployeeDepartments(id)
        const practice = await proc.viewEmployeePractice(id)
        const badges = await proc.viewemployeeBadges(id)
        res.send({personalInfo, practice, departments, badges})
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

exports.getAssignedActivities = async (req, res) => {

    const id = req.body.id  
    if (!id) {
      res.status(400).send({
        message: "Employee ID needed"
    })
      return
    }
    try{
     //get activity information
     const assignedTasks= await Employee.findAll({ 
        where: { id , isComplete: false },
        include: [{ 
                model: Activity, 
                required: true
                 }] 
     })  
    res.send(assignedTasks)
    } catch(err){

        res.status(500).send({
            message:
            err.message || "Some error occurred while fetching the data." })        
    }
  }

  exports.submitActivity = async (req, res) => {

    const { EmployeeId , ActivityId } = req.body

    if(!(EmployeeId && ActivityId)){

      res.status(400).send({
          message: "Please provide all input fields!"
        })
        return
    }

    try{
      //update does not return the new updated row- not supported for MySql
      const submittedActivity = await EmployeeActivity.update({ inReview : true }, {
          where: {
              EmployeeId,
              ActivityId
          },
          returning : true 
      })
      res.send(submittedActivity)

    }catch(err){

      res.status(500).send({
          message:
          err.message || "Some error occurred" })
  }
  }