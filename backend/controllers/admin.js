const path = require('path')
const excel = require('exceljs');
const db = require('../db/mysql')


exports.getPreviousActivities = async (req, res) => {
  const cycleID = parseInt(req.params.cycleID)
  db.query('CALL viewActivitiesNotInCycle(?)', cycleID, (err, result) => {
    if(result && result[0])
      return res.send(result[0])
    else if(err)
      return res.status(400).send(err)
    else 
      return res.send([])
  })

}


exports.createNewCycle= async (req,res)=>{

  
  const { adminID, start_date, end_date} = req.body
  if (!(start_date && end_date )) {
    res.status(400).send({
      message: "Please provide all input fields"
    });
      return;
  }
    const cycle = [adminID,start_date,end_date]
    db.query('CALL createNewCycle(?,?,?, @stat); select @stat AS status;', cycle ,(err, result) => {
      if(result){
        console.log(result)
        const status = result[1][0].status
        if(status===0)
          res.status(200).json({message: 'A Cycle would be running within the dates you specified',status:0});
        else
          res.status(200).json({message:'Cycle created succesfully!', status:1});
      }
      else{
        console.log(err)
        res.status(400).send(err)
      }
    })
  

}

exports.viewParticipants = async (req, res) => {
    const cycleID = parseInt(req.params.cycleID)
   
      db.query('CALL viewEmployeesInCycle(?)', cycleID ,(err, result) => {
        if(result && result[0])
          return res.send(result[0]);
        else if (err){
          console.log(err)
          return res.status(400).send(err)
        }
         

        else return res.send([])
        
        
      })

      
    
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

exports.disableCycle = async (req, res) => {
    const cycleID = req.params.cycleID
    db.query('UPDATE cycle SET current = 0 WHERE id = (?)', cycleID ,(err, result) => {
        res.status(200).send('Cycle disabled successfully');
    })
  
}

exports.viewProfile = async (req, res) => {
    const adminID = parseInt(req.params.id)   
      db.query('SELECT * FROM admin WHERE id = (?)', adminID ,(err, result) => {
          if(result && result[0]){
            var userData = {
              id: result[0].id,
              first_name: result[0].first_name,
              last_name: result[0].last_name,
              username: result[0].username,
            }
            return res.send(userData)
          }
          else if (err)
            res.status(400).send(err)
          
          else
            return res.send({})
      })
}

exports.viewEmployeeStatus = async (req, res) => {
    id = parseInt(req.params.employeeId)
    cycleID = parseInt(req.params.cycleID)
    //activities completed by this employee

    let result = {}

    const employeeInfo = new Promise ((resolve, reject) => {
      db.query('CALL viewEmployeePersonalInfo(?)', id, (err, result) => {
        if(err)
          reject(err)
        else
          resolve(result[0])
      })
    })

    const completed_activities = new Promise ((resolve, reject) => {
      db.query('CALL viewCompletedTasks(?,?)', [id, cycleID], (err, result) => {
        if(err)
          reject(err)
        else
          resolve(result[0])
      })
    })

    const pending_activities = new Promise ((resolve, reject) => {
      db.query('CALL viewCyclePendingTasks(?,?)', [id, cycleID], (err, result) => {
        if(err)
          reject(err)
        else
          resolve(result[0])
      })
    })
  
    const inprogress_activities = new Promise ((resolve, reject) => {
      db.query('CALL viewCycleToBeSubmittedTasks(?,?)', [id, cycleID], (err, result) => {
        if(err)
          reject(err)
        else
          resolve(result[0])
      })
    })
    
    const total_points = new Promise ((resolve, reject) => {
      db.query('CALL totalGainedPointsInCycle(?,?)', [id, cycleID], (err, result) => {
        if(err)
          reject(err)
        else
          resolve(result[0])
      })
    })

    const badges = new Promise ((resolve, reject) => {
      db.query('CALL viewEmployeeCycleBadges(?,?)', [id, cycleID], (err, result) => {
        if(err)
          reject(err)
        else
          resolve(result[0])
      })
    })

    const virtual_recognitions = new Promise ((resolve, reject) => {
      db.query('CALL viewEmployeeCycleVirtualRecognition(?,?)', [id, cycleID], (err, result) => {
        if(err)
          reject(err)
        else
          resolve(result[0])
      })
    })


    const cycleInfo = new Promise ((resolve, reject) => {
      db.query('CALL viewCycleDetailsForAdmin(?)', [cycleID], (err, result) => {
        if(err)
          reject(err)
        else
          resolve(result[0])
      })
    })

    try{
      result.pending_activities = await pending_activities
    }catch{
      res.pending_activities = []
    }
    try{
      result.completed_activities = await completed_activities
    }catch{
      res.completed_activities = []
    }
    try{
      result.inprogress_activities = await inprogress_activities
    }catch{
      res.inprogress_activities = []
    }
    try{
      result.total_points = await total_points
    }catch{
      result.total_points = []
    }
    try{
      result.badges  = await badges
    }catch{
      result.badges = []
    }
    try{
      result.virtual_recognitions = await virtual_recognitions
    }catch{
      result.virtual_recognitions = []
    }
    try{
      result.cycleInfo = await cycleInfo
    }catch{
      result.cycleInfo = []
    }
    try{
      result.personalInfo = await employeeInfo
    }catch{
      result.personalInfo = []
    }
    
  return res.send(result)
}

exports.exportToExcelLeaderboard = async(req, res) => {
  //const list = []
  let list = []
  const cycleID = parseInt(req.params.cycleID)
  const rank = new Promise((resolve, reject) => {
    db.query('CALL getEmployeeRankings(?)', cycleID, (err, result) => {
      if(result && result[0])
          resolve(result[0])    
      else  
        reject(err)
      })
  })
  list = await rank
  
  for(let i = 1 ; i < list.length ; i++){
    list[i].rank = i
    if(list[i].is_developer)
      list[i].is_developer = 'Yes'
    else  
    list[i].is_developer = 'No'
  }
  
  let workbook = new excel.Workbook()
	let worksheet = workbook.addWorksheet('Sheet1')
    worksheet.columns = [
        { header: 'Rank', key: 'rank', width: 30 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Total points', key: 'points', width: 30},
        { header: 'Developer', key: 'is_developer', width: 10, outlineLevel: 1}
    ];
  worksheet.addRows(list);

    workbook.xlsx.writeFile("participants.xlsx")
		.then(function() {
			console.log("file saved!")
            const excelPath = __dirname.split('controllers')[0] + 'participants.xlsx'
            res.sendFile(excelPath, (err) => {console.log(err, 'tmm')})

            
	}).catch((e) => res.status(400).json(e));
}

exports.createBadge= async (req, res) => {
  var name = req.body.name;
  var description = req.body.description;
  var type = req.body.type;
  var pointsNeeded = req.body.points_needed;
  var isEnabled  = req.body.enabled;
  
  try{
    db.query(`INSERT INTO Badge (name, description, type, points_needed, enabled) 
    VALUES (?,?,?,?,?)`, [name, description, type, pointsNeeded, isEnabled], (err, result) => {
      res.status(200).send(result);
    })
  } catch(e){
    console.log(e)
    res.status(400).send(e);
  }
}

exports.updateBadge = async(req, res) => {
  var {name, description, type, points_needed, enabled} = req.body;
  var id = req.params.badgeID;

  console.log(req.body);
  // console.log(id);
  // console.log(description)
  try{
    db.query(`CALL updateBadge(?,?,?,?,?,?)`, 
    [name, description, type, points_needed, enabled, id], (err, result) => {
      res.status(200).send('Badge updated successfully');
    });
  } catch(e){
    // console.log(e)
    res.status(400).send(e);
  }
}

exports.createCycle= async (req, res) => {
  var {start_date, end_date, admin_id} = req.body;
  try{
    db.query(`INSERT INTO cycle (start_date, end_date, admin_id) 
    VALUES (?,?,?)`, [start_date, end_date, admin_id], (err, result) => {
      console.log(result);
      res.status(200).send('Cycle added successfully');
    })
  } catch(e){
    console.log(e)
    res.status(400).send(e);
  }
}

exports.getActivities = async (req, res) => {
  const {cycleID} = req.params
    db.query(`CALL viewActivities(?)`, cycleID, (err, result) => {
      if(result && result[0])
        res.status(200).send(result[0]);
      else if (err)
        res.status(400).send(err);
      else 
        res.status(200).send([]);
    })
  
}

exports.getAllActivities = async (req, res) => {
 
    db.query(`SELECT * FROM Activity`, (err, result) => {

      if(result)
        return res.status(200).send(result);
      else (err)
        return res.status(400).send(err);
    
    })
  
}

exports.getBadges= async (req, res) => {
    db.query(`SELECT * FROM Badge`,(err, result) => {
      if(result && result[0])
        res.status(200).send(result)
      else if(err)
        res.status(400).send(err)
      else
      res.status(200).send([])

    })

}

exports.getCycles= async (req, res) => {

  try{
    db.query(`SELECT * FROM cycle`,(err, result) => {
      res.status(200).send(result);
    })
  } catch(e){
    console.log(e)
    res.status(400).send(e);
  }
}

exports.getEmployeesActivity = async (req, res) => {
  const {activityId, cycleId}= req.query
     if(!activityId){
      res.status(400).send({
        message: "Please provide all input fields!"
      });
      return;
     }
 
    db.query(`CALL getEmployeesActivity(?,?)`,[activityId, cycleId],(err, result) => {
      if(result){
        res.status(200).send(result);
      }
      else{
        res.status(400).send(err);
      }
           
    })
  
}

exports.createNewActivity = async (req, res) => {

  const adminID = req.id
  const {name, description, type, virtual_recognition, points} = req.body
  if (!( name && description && type && points) && virtual_recognition!==undefined ) {
    res.status(400).send({
      message: "Please provide all input fields!"
    });
      return;
  }
    // Create a new activity
    const activity = [name, description, type,  virtual_recognition, points, adminID]
    db.query('CALL createNewActivity(?,?,?,?,?,?, @stat); select @stat AS status;', activity ,(err, result) => {
      if(result){
        const status = result[1][0].status
        if(status===0)
          res.status(200).json({message:'An Activity with this name already exists, please choose another one', status:0});
        else
          res.status(200).json({message:'Activity Created succesfully', status:1});
      }
      else{
        console.log(err)
        res.status(400).send(err)
      }
    })
}

exports.editActivity= async (req, res) => {

  const { ActivityId ,name, description, enabled, virtual_recognition, points, cycleId } = req.body
  console.log(req.body)
  console.log(points)
  // Validate request
  if ( !( ActivityId && name && description  && points && cycleId) && virtual_recognition!==undefined && enabled!==undefined) {
    res.status(400).send({
      message: "Please provide all input fields!"
    });
    return;
  } 
    
    const activity = [ ActivityId, name, description, enabled, virtual_recognition, points, cycleId ];
    console.log(activity)

    db.query('CALL editActivity(?,?,?,?,?,?,?, @stat); select @stat AS status;', activity ,(err, result) => {
      if(result){
        const status = result[1][0].status
        if(status===0)
          res.status(200).json({message:'An Activity with this name already exists, please choose another one', status:0});
        else
          res.status(200).json({message:'Activity updated succesfully', status:1});
      }
      else{
        console.log(err)
        res.status(400).send(err)
      }
    })
  
  }

  exports.assignEmployeeToActivity= async (req, res) => {

      const { EmployeeId , ActivityId , CycleId } = req.body

      if(!(EmployeeId && ActivityId && CycleId)){

        res.status(400).send({
            message: "Please provide all input fields!"
          })
          return
  }
    const employeeActivity=[EmployeeId, ActivityId, CycleId]

     db.query('CALL assignEmployeeToActivity(?,?,?);', employeeActivity ,(err, result) => {
      if(result){
          res.status(200).json('Employee Assigned to Activity');    
      }
      else{
        res.status(400).send(err)
      }
    })
    
  }

  exports.markActivityAsComplete = async (req, res) =>{

    const { EmployeeId , ActivityId, CycleId } = req.body

      if(!(EmployeeId && ActivityId && CycleId)){

        res.status(400).send({
            message: "Missing fields in the request object"
          })
          return
      }
      const employeeActivity=[EmployeeId, ActivityId, CycleId];

      db.query('CALL markActivityAsComplete(?,?,?);', employeeActivity ,(err, result) => {
        if(result){
            res.status(200).json('Action done successfully');    
        }
        else{
          res.status(400).send(err)
        }
      })
      
  }

  exports.removeActivityCompletion = async (req, res) =>{

    const { EmployeeId , ActivityId, CycleId } = req.body

      if(!(EmployeeId && ActivityId && CycleId)){

        res.status(400).send({
            message: "Missing fields in the request object"
          })
          return
      }
      const employeeActivity=[EmployeeId, ActivityId, CycleId];

      db.query('CALL removeActivityCompletion(?,?,?);', employeeActivity ,(err, result) => {
        if(result){
            res.status(200).json('Action done successfully');    
        }
        else{
          res.status(400).send(err)
        }
      })

    
  }

  exports.cycleInfo = async (req,res) => {
    const cycleID = parseInt(req.params.id)
    console.log(cycleID)
    db.query('CALL viewCycleDetailsForAdmin(?)', cycleID, (err, result) => {
      if(result && result[0]){
        return res.send(result[0][0])
      }
      return res.status(400).send()
    })
  }

  exports.activityInfo = async (req, res) => {
    console.log(req.query);
    const {id, CycleId} = req.query
  
    if (!(id && CycleId)) {
      res.status(400).send({
        message: "Please specify all required fields"
      });
      return
    }
    db.query('CALL viewActivity(?,?);',[id, CycleId],(err, result) => {
      if(result){
          res.status(200).send(result)  
      }
      else{
          res.status(400).send(err)
      }
    })
  }

  exports.pendingActivities = async (req, res) => {
    const cycleID  = parseInt(req.params.cycleID)
    if (!cycleID ) 
      return res.status(400).send({message: "Please specify activity name or ID"})
  
    db.query('CALL getPendingActivities(?)', [cycleID],(err, result) => {
      if(result && result[0])
          res.status(200).send(result[0]);    
      
      else if(err)
        res.status(400).send(err)

      else 
        res.send([])
      
    })
  }


 