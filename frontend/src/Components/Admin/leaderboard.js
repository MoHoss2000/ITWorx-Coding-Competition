import React, {useState, useEffect} from 'react'
import { Table, Button, Space } from 'antd';
import axios from 'axios'
import Spinner from '../General/loadingSpinner'

const Leaderboard = () => {
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
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Total Points',
            dataIndex: 'sum(A.points)',
            key: 'points',
            sorter: (a, b) => a.points - b.points,
            sortOrder: sort.columnKey === 'points' && sort.order,
            ellipsis: true,
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
        <h1 className="title">Leaderboard</h1>
          <Table columns={columns} dataSource={data} onChange={handleChange} />
          <Space style={{ marginBottom: 16, marginLeft: '5%'}}>
            <Button onClick={setPointsSort}>Sort points</Button>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>
          </Space>
        </>
      );
}

export default Leaderboard