import React, {useState, useEffect} from 'react'
import {Badge, Descriptions, Tabs, Typography, Divider, Card, Avatar} from 'antd'
import axios from 'axios'
import PersonalInfo from './PersonalInfo'
import Spinner from '../General/loadingSpinner'
import VirtualRecognitions from './VirtualRecognitions'
import Badges from './Badges'
import {SketchOutlined, UserOutlined} from '@ant-design/icons';
import '../components.css'
const { TabPane } = Tabs;
const { Title } = Typography;

const EmployeeStatus= () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        const employeeId = 1
        const cycleID = 1
        const getStatus= async () => {
            const {data} = await (axios.get(`http://localhost:3001/employeeStatus/${employeeId}/${cycleID}`))
            setData(data)
            setLoading(false)
            console.log(data)
        } 
        getStatus()
    }, [])

    if(loading)
        return <Spinner/>

    return(
        <div>
        </div>
    )
}

export default EmployeeStatus
