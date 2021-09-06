import React, {useState, useEffect} from 'react'
import { Table, Button, Space } from 'antd';
import axios from 'axios'
import Spinner from './loadingSpinner'

const Leaderboard = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [sort, setSort] = useState({})
    const [filter, setFilter] = useState({})
    useEffect(() => {
        const getLeaderboard = async () => {
            const res = (await axios.post('http://localhost:3001/leaderboard/employee', {cycleID: 1}))
            for(let i of res.data){
                if(i.developer)
                    i.developer = 'Developer'
                else
                    i.developer = 'Non-developer'
            }
            setData(res.data)
            setLoading(false)
        }
        getLeaderboard()
    }, [])
    
    const handleChange = (pagination, filters, sorter) => {
        //console.log('Various parameters', pagination, filters, sorter);
        console.log(filters)
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
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Total Point',
            dataIndex: 'points',
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
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },


    ]

    if(loading)
        return <Spinner/>


    console.log(data)
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