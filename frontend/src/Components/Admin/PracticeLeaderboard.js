import React, {useState} from 'react'
import { Table } from 'antd';


const PracticeLeaderboard = ({data}) => {

    const [sort, setSort] = useState({})


    const handleChange = (_pagination, _filters, sorter) => {
        setSort(sorter)
    }

     const columns = [
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
        },
        {
          title: 'Practice',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Total Points',
            dataIndex: 'TotalPoints',
            key: 'TotalPoints',
            sorter: (a, b) => a.TotalPoints - b.TotalPoints,
            sortOrder: sort.columnKey === 'TotalPoints' && sort.order,
            ellipsis: true,
        },
        {
            title: 'Number of Employees',
            dataIndex: 'numberOfEmployees',
            key: 'numberOfEmployees',
            ellipsis: true,

        },
        {
            title: 'Points per Employee',
            dataIndex: 'pointsPerEmployee',
            key: 'pointsPerEmployee',
            sorter: (a, b) => a.pointsPerEmployee - b.pointsPerEmployee,
            sortOrder: sort.columnKey === 'pointsPerEmployee' && sort.order,
            ellipsis: true,
        },
    ]

    return (
        <>
            <Table columns={columns} dataSource={data} onChange={handleChange} />
        </>
    );
}

export default PracticeLeaderboard