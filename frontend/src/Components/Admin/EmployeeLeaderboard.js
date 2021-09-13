import React, {useState, useEffect} from 'react'
import { Table, Button, Space } from 'antd';
import axios from 'axios'
import Spinner from '../General/loadingSpinner'

const EmployeeLeaderboard = ({pass}) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [sort, setSort] = useState({})
    const [filter, setFilter] = useState({})
    

    useEffect(() => {
        const getLeaderboard = async () => {
            const cycleID = 1
            const res = (await axios.get(`http://localhost:3001/leaderboard/employee/${cycleID}`))
            for(let i = 0 ; i < res.data.length ; i++){
                console.log(res.data)
                res.data[i].key = i
                res.data[i].rank = i + 1
                if(res.data[i].developer)
                    res.data[i].developer = 'Developer'
                else
                    res.data[i].developer = 'Non-developer'
            }
            setData(res.data)
            pass(res.data)
            setLoading(false)
        }
        getLeaderboard()
    }, [])
    
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilter(filters)
        setSort(sorter)
    }

    const clearFilters = () => {
        setFilter({})
    }

    const clearAll = () => {
        setFilter({})
        setSort({})
    }

    const setPointsSort = () => {
       setSort({
          sort: {
            order: 'descend',
            columnKey: 'points',
          },
        })
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

    if(loading)
        return <Spinner/>
        
    return (
        <>
          <Table columns={columns} dataSource={data} onChange={handleChange} scroll={{ y: 500 }}/>
        </>
      );
}

export default EmployeeLeaderboard