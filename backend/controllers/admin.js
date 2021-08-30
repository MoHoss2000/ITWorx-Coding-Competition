const path = require('path')
const excel = require('exceljs');
const {Employee, Admin} = require('../models')
const proc = require('../db/procedures')


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