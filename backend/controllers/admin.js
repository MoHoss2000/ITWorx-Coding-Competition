const path = require('path')
const excel = require('exceljs');
const db = require('../db/mysql')


exports.viewParticipants = async (req, res) => {
    const cycleID = req.params.cycleID
    try{
      db.query('CALL viewEmployeesInCycle(?)', cycleID ,(err, result) => {
          res.send(result[0]);
      })
    } catch(e){
      console.log(e)
      res.status(400).send(e);
    }
}

exports.exportToExcelParticipants = async(req, res) => {
    const list = req.body.result
    let newList = []
    list.forEach((element) => {
        let newElement = element
        newElement.fullName = element.first_name + ' ' + element.last_name
        newList.push(newElement)
    })
    let workbook = new excel.Workbook()
	let worksheet = workbook.addWorksheet('Participants')
    worksheet.columns = [
        { header: 'Name', key: 'fullName', width: 30 },
        { header: 'Username', key: 'username', width: 30},
        { header: 'Developer', key: 'is_developer', width: 10, outlineLevel: 1}
    ];
    worksheet.addRows(newList);

    workbook.xlsx.writeFile("participants.xlsx")
		.then(function() {
			console.log("file saved!")
            const excelPath = __dirname.split('controllers')[0] + 'participants.xlsx'
            res.download(excelPath)
            res.status(200).send()
	});
} 


/// warning: no disabled column in cycle table?
exports.disableCycle = async (req, res) => {
    cycleID = req.params.cycleID
    try{
    await Cycle.update({disabled: 1}, {where: {id: cycleID}});
    res.status(200).json({message: 'Cycle disabled successfully'});

    } catch(e) {
        res.status(400).json({ error: err });
    }

    const cycleID = req.params.cycleID
    try{
      db.query('UPDATE cycle SET disabled = 1 WHERE id = (?)', cycleID ,(err, result) => {
          res.status(200).send('Cycle disabled successfully');
      })
    } catch(e){
      console.log(e)
      res.status(400).send(e);
    }
}

exports.viewProfile = async (req, res) => {
    adminID = req.params.id   

    try{
      db.query('SELECT * FROM admin WHERE id = (?)', adminID ,(err, result) => {
          // res.send(result[0]);

          if(result.length == 0)
            return res.status(404).json({'message': 'User not found'});


          var userData = {
            id: result[0].id,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            username: result[0].username,
          }

          return res.status(200).send(userData);
      })
   } catch(e){
      console.log(e)
      res.status(400).send(e);
  }
}

exports.viewEmployeeStatus = async (req, res) => {
    id = req.params.employeeId

    //activities completed by this employee
    const activities = proc.viewCompletedActivities(id)
    //total gained points
    const total_points = proc.totalGainedPoints(id)
    //all badges earned by this employee
    const badges = proc.viewmployeeBadges(id)
    //all VR earned by this employee
    const virtual_recognitions = proc.viewEmployeVirtualRecognition(id)



    return res.send({activities, total_points, badges, virtual_recognitions})

}

// exports.exportToExcelLeaderboard = async(req, res) => {
//     const list = req.body.result
//     const sort = req.body.sort
//     let newList = []
//     if(sort === 'employees' || sort === 'developers' || sort === 'non-developers')
//     list.forEach((element) => {
//         let newElement = element
//         newElement.fullName = element.first_name + ' ' + element.last_name
//         newList.push(newElement)
//     })
//     let workbook = new excel.Workbook()
// 	let worksheet = workbook.addWorksheet(sort)
//     worksheet.columns = [
//         { header: 'Name', key: 'fullName', width: 30 },
//         { header: 'Username', key: 'username', width: 30},
//         { header: 'Developer', key: 'is_developer', width: 10, outlineLevel: 1}
//     ];
//     worksheet.addRows(newList);

//     workbook.xlsx.writeFile("participants.xlsx")
// 		.then(function() {
// 			console.log("file saved!")
//             const excelPath = __dirname.split('controllers')[0] + 'participants.xlsx'
//             res.download(excelPath)
//             res.status(200).send()
// 	}).catch((e) => res.status(400).send(e));
//}



exports.getActivities = async (req, res) => {

  try{
    db.query(`SELECT * FROM activity`,(err, result) => {
      res.status(200).send(result);
    })
  } catch(e){
    console.log(e)
    res.status(400).send(e);
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
    const activity = [name, description, type, enabled, virtual_recognition, points]

    try{
      db.query(`INSERT INTO activity (name, description, type, enabled, virtual_recognition, points) 
        VALUES (?,?,?,?,?,?)
      `, activity ,(err, result) => {
        console.log(result);
        res.status(200).json({message: 'Activity added successfully '});

      })
   } catch(e){
      console.log(e)
      res.status(400).send(e);
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


 