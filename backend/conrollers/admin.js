const db = require("../models/index") 
const employee = require("../models/employee")
const { Activity , EmployeeActivity, Employee, Cycle }  = db

exports.getActivities = async (req, res) => {

    try {
        const activites = await Activity.findAll()
        res.send(activites)
    } catch(err){

        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Activity." })
    }
}

exports.createNewActivity = async (req, res) => {

    const {name, description, type, enabled, virtual_recognition, points} = req.body

    // Validate request
    if ( !( name && description && type && enabled && points) && virtual_recognition!==undefined) {

      res.status(400).send({
        message: "Please provide all input fields!"
      });
      return;
    }
     
    // Create an new activity
    const activity = { name, description, type, enabled, virtual_recognition, points}

    // Save Tutorial in the database
    try{
        const newActivity = await Activity.create(activity)
        res.send(newActivity)

    } catch(err){

        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Activity." })
    }

  
  }
  exports.editActivity= async (req, res) => {

    const { ActivityId ,name, description, type, enabled, virtual_recognition, points} = req.body

    // Validate request
    if ( !( ActivityId && name && description && type && enabled && points) && virtual_recognition!==undefined) {

      res.status(400).send({
        message: "Please provide all input fields!"
      });
      return;
    }
     
    // Create an new activity
    const activity = { name, description, type, enabled, virtual_recognition, points}

    // Save Tutorial in the database
    try{
        const updatedActivity = await Activity.update(activity, {
            where: {
              id: ActivityId
            },
            returning : true 
        })
        res.send(updatedActivity)

    } catch(err){

        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Activity." })
    }

  
  }

  exports.assignEmployeeToActivity= async (req, res) => {

      const { EmployeeId , ActivityId , CycleId } = req.body

      if(!(EmployeeId && ActivityId && CycleId)){

        res.status(400).send({
            message: "Please provide all input fields!"
          })
          return
  }
    const employeeActivity={
        EmployeeId,
        ActivityId,
        CycleId,
        status: 'A'
    }
    try{
        const assignedEmployee = await EmployeeActivity.create(employeeActivity)
        res.send(assignedEmployee)

    }catch(err){

        res.status(500).send({
            message:
            err.message || "Some error occurred while Assigning the employee." })
    }
  }

  exports.markActivityAsComplete = async (req, res) =>{

    const { EmployeeId , ActivityId, CycleId } = req.body

      if(!(EmployeeId && ActivityId && CycleId)){

        res.status(400).send({
            message: "Missing fields in the request object"
          })
          return
      }

      try{
        //update does not return the new updated row- not supported for MySql
        const assignedEmployee = await EmployeeActivity.update({ status : 'C'  }, {
            where: {
                EmployeeId,
                ActivityId, 
                CycleId
            }
           
        })
        res.send(assignedEmployee)

      }catch(err){

        res.status(500).send({
            message:
            err.message || "Some error occurred" })
    }
      
  }

  exports.removeActivityCompletion = async (req, res) =>{

    const { EmployeeId , ActivityId, CycleId } = req.body

      if(!(EmployeeId && ActivityId && CycleId)){

        res.status(400).send({
            message: "Missing fields in the request object"
          })
          return
      }

      try{
        //update does not return the new updated row- not supported for MySql
        const assignedEmployee = await EmployeeActivity.update({ status : 'A'  }, {
            where: {
                EmployeeId,
                ActivityId, 
                CycleId
            },
            returning : true 
        })
        res.send(assignedEmployee)

      }catch(err){

        res.status(500).send({
            message:
            err.message || "Some error occurred" })
    }
      
  }

  exports.activityInfo = async (req, res) => {

    const {id, CycleId} = req.body.id

    if (!(id && CycleId)) {
      res.status(400).send({
        message: "Please specify all required fields"
      });
      return
    }
    try{
     //get activity information
     const assignedEmployees= await Activity.findAll({ 
        where: { id },
        include: [{ 
                model: Employee, 
                required: true,
                include :[{
                     model : Cycle, 
                     where: {CycleId},
                     required: true
                    }]
             }
        ] 
      })
   
    res.send(assignedEmployees)

    } catch(err){

        res.status(500).send({
            message:
            err.message || "Some error occurred while Assigning the employee." })        
    }
  }

  exports.pendingActivities = async (req, res) => {

    const {id, CycleId} = req.body.id  

    if (!(id && CycleId)) {
      res.status(400).send({
        message: "Please specify activity name or ID"
      });
      return
    }
    try{
     //get activity information
     const employees= await Activity.findAll({ 
        where: { id },
        include: [{ 
                model: Employee, 
                where: { inReview: true },
                required: true,
                include :[{
                    model : Cycle, 
                    where: {CycleId},
                    required: true
                   }]
             }
        ] 
      })
   
    res.send(employees)

    } catch(err){

        res.status(500).send({
            message:
            err.message || "Some error occurred while Assigning the employee." })        
    }
  }


 