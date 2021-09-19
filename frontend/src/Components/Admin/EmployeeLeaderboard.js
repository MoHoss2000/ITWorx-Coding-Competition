import React, {useState} from 'react'
import { Table } from 'antd';

const EmployeeLeaderboard = ({data}) => {
    const [sort, setSort] = useState({})
    const [filter, setFilter] = useState({})

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilter(filters)
        setSort(sorter)
    }

    const columns = [
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            width: '10%'
           
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        
        },
        {
            title: 'Total Points',
            dataIndex: 'points',
            key: 'points',
            sorter: (a, b) => a.points - b.points,
            sortOrder: sort.columnKey === 'points' && sort.order,
            ellipsis: true,
            width: '20%'
        },
        {
            title: 'Developer/Non-developer',
            dataIndex: 'developer',
            key: 'developer',
            filters: [
                { text: 'Developer', value: 'Developer' },
                { text: 'Non-developer', value: 'Non-developer' },
            ],
            filteredValue: filter.developer || null,
            onFilter: (value, record) => record.developer.includes(value),
            ellipsis: true,

        },
    ]
        
    return (
        <>
          <Table columns={columns} dataSource={data} onChange={handleChange} scroll={{ y: 500 }}/>
        </>
      );
}

export default EmployeeLeaderboard