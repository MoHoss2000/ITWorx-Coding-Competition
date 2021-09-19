import React from 'react'
import { Button } from 'antd';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportExcel = ({csvData, fileName, buttonText}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToExcel = (csvData, fileName) => {

        const ws1 = XLSX.utils.json_to_sheet(csvData[0]);
        const ws2 = XLSX.utils.json_to_sheet(csvData[1]);
        const ws3 = XLSX.utils.json_to_sheet(csvData[2]);

        const wb = { 
            Sheets: { 
                        'Employees Leaderboard': ws1,
                        'Departments Leaderboard': ws2,
                        'Practice Leaderboard': ws3
                    }, 
            SheetNames: ['Employees Leaderboard','Departments Leaderboard', 'Practice Leaderboard'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <Button type="primary" style={{margin: '10px'}}  onClick={(e) => exportToExcel(csvData,fileName)}>{buttonText}</Button>
    )
}

