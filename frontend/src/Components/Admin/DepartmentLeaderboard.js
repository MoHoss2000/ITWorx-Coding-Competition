import React, {useState, useEffect} from 'react'
import { Table, Button, Space } from 'antd';
import axios from 'axios'
import Spinner from '../General/loadingSpinner'

const DepartmentLeaderboard = ({id}) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [sort, setSort] = useState({})
    const [filter, setFilter] = useState({})

    useEffect(() => {
        const getLeaderboard = async () => {
            const res = (await axios.get(`http://localhost:3001/leaderboard/department/${id}`))
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

    if(loading)
        return <Spinner/>

    return (
        <>
            <Table columns={columns} dataSource={data} onChange={handleChange} />
        </>
    );
}

export default DepartmentLeaderboard