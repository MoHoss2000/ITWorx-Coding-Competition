import React, {useState} from 'react'
import { Table } from 'antd';


const DepartmentLeaderboard = ({data}) => {

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
          title: 'Department',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Weighted Points',
            dataIndex: 'WeightedPoints',
            key: 'WeightedPoints',
            sorter: (a, b) => a.WeightedPoints - b.WeightedPoints,
            sortOrder: sort.columnKey === 'WeightedPoints' && sort.order,
            ellipsis: true,
        },
        {
            title: 'Number of Employees',
            dataIndex: 'numberOfEmployees',
            key: 'numberOfEmployees',
            ellipsis: true,
        },
    ]

    // if(loading)
    //     return <Spinner/>

    return (
        <>
            <Table columns={columns} dataSource={data} onChange={handleChange} />
        </>
    );
}

export default DepartmentLeaderboard