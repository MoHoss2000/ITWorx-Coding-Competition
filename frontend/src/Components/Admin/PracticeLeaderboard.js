import React, {useState, useEffect} from 'react'
import { Table, Button, Space } from 'antd';
import axios from 'axios'
import Spinner from '../General/loadingSpinner'

const PracticeLeaderboard = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [sort, setSort] = useState({})
    const [filter, setFilter] = useState({})

    useEffect(() => {
        const getLeaderboard = async () => {
            const cycleID = 1
            const res = (await axios.get(`http://localhost:3001/leaderboard/practice/${cycleID}`))
            for(let i = 0 ; i < res.data.length ; i++){
                res.data[i].rank = i+1
                res.data[i].key = i
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

    if(loading)
        return <Spinner/>

    return (
        <>
        <h1 className="title">Practice Leaderboard</h1>
            <Table columns={columns} dataSource={data} onChange={handleChange} />
            <Space style={{ marginBottom: 16, marginLeft: '5%'}}>
            <Button onClick={setPointsSort}>Sort based on Rank</Button>
            </Space>
        </>
    );
}

export default PracticeLeaderboard