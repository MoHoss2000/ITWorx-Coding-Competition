import React, {useState, useEffect} from 'react'
import {Badge, Descriptions, Tabs, Typography, Divider, Card, Avatar} from 'antd'
import axios from 'axios'

import Spinner from '../../General/loadingSpinner'



import '../../components.css'
import CycleInfo from '../../General/CycleInfo'
const { TabPane } = Tabs;
const { Title } = Typography;

const EmployeeCycleStatus= () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        const employeeId = 1
        const cycleID = 1
        const getStatus = async () => {
            const { data } = await (axios.get(`http://localhost:3001/admin/employeeStatus/${employeeId}/${cycleID}`))
            console.log(data)
            setData(data)
            setLoading(false)
        } 
        getStatus()
    }, [])

    if(loading)
        return <Spinner/>

    return(
        <div>
            <CycleInfo data={data.cycleInfo[0]} />
        </div>
    )
}

export default EmployeeCycleStatus
