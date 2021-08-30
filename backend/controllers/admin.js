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

     workbook.xlsx.writeFile("participants.xlsx")
		.then(function() {
			console.log("file saved!")
            res.status(200).send()
	});
    
    // URL of the image
    const url = 'participants.xlsx';
    
    https.get(url,(res) => {
        // Image will be stored at this path
        const path = `${__dirname}/files/img.jpeg`; 
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);
        filePath.on('finish',() => {
            filePath.close();
            console.log('Download Completed'); 
        })
})
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