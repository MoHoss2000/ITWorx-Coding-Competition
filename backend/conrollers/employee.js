const db = require("../models/index") 
const employee = require("../models/employee")
const { Activity , EmployeeActivity, Employee }  = db

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

  exports.submitActivity= async (req, res) => {

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