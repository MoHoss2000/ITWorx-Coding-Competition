const path = require('path')
const excel = require('exceljs');
const {Cycle} = require('../models')
const proc = require('../db/procedures')
const fs = require('fs');
const https = require('https');


exports.viewParticipants = async (req, res) => {
    const cycleID = req.params.cycleID
    try{
        const result = await proc.viewEmployeesInCycle(cycleID)
        res.json({ result })
    }catch(e){
        console.log(e)
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

exports.disableCycle = async (req, res) => {
    cycleID = req.params.cycleID
    try{
    await Cycle.update({disabled: 1}, {where: {id: cycleID}});
    res.status(200).json({message: 'Cycle disabled successfully'});

    } catch(e) {
        res.status(400).json({ error: err });
    }
}

exports.viewProfile = async (req, res) => {
    adminID = req.params.id   
    try{
        const admin = await adminId.findOne({ where: {id: adminID}}) 
        const personalInfo = { id: admin.id, 
                               first_name: admin.first_name, 
                               last_name: admin.last_name,
                               username: admin.user_name
                               //avatar: admin.avatar 
                            }
                      
        return res.send({personalInfo})
    }catch{
        return res.status(400).send()
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
