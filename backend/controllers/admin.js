const path = require('path')
const excel = require('exceljs');
const nodemailer = require("nodemailer");
const {Employee, Admin} = require('../models')
const proc = require('../db/procedures')

exports.resetPassword = async (req, res) => {
    const {email} = req.body
    let User
    //check if a user with this email exists 
    const admin = await Admin.findOne({ username: email })
    if (admin)
        User = admin
    else {
        const employee = await Employee.findOne({ username: email }) 
        if (employee)
            User = employee
        else
            return res.status(200).json({message: 'No user with this email exists'});        
    }
    const token = jwt.sign ({ id: User.id}, Process.env.Reset_Password, {expiresIn: '15m'})
}
exports.viewParticipants = async (req, res) => {
    const cycleID = req.params.cycleID
    try{
        const result = await proc.viewEmployeesInCycle(cycleID)
        res.json({ result })
    }catch(e){
        console.log(e)
    }
}

exports.exportToExcel = async(req, res) => {
    const list = req.body.result
    console.log(list.length)
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

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "participants.xlsx"
      );

    return workbook.xlsx.writeFile("participants.xlsx")
		.then(function() {
			console.log("file saved!")
            res.status(200).send()
	});
}