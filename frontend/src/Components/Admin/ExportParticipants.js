import React from 'react'
import { Button } from 'antd';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportParticipants = ({csvData, fileName, buttonText}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToExcel = (csvData, fileName) => {

        const ws = XLSX.utils.json_to_sheet(csvData)
        const wb = { 
            Sheets: { 
                        'Cycle participants': ws
                    }, 
            SheetNames: ['Cycle participants'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <Button type="primary" style={{margin: '10px'}}  onClick={(e) => exportToExcel(csvData,fileName)}>{buttonText}</Button>
    )
}

