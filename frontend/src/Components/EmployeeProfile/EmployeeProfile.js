import React, {useState, useEffect} from 'react'
import {Badge, Descriptions} from 'antd'
import axios from 'axios'
import PersonalInfo from './PersonalInfo'
import Spinner from '../General/loadingSpinner'
import VirtualRecognitions from './VirtualRecognitions'
import Badges from './Badges'

const EmployeeProfile = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    useEffect(() => {
        const id = 1
        const cycleID = 1
        const getInfo = async () => {
            const {data} = await (axios.get(`http://localhost:3001/employee/profile/${id}/${cycleID}`))
            setData(data)
            setLoading(false)
        } 
        getInfo()
    }, [])

    if(loading)
        return <Spinner/>

    return(
        <div style={{width:'100%' , display: 'flex', flexWrap: 'wrap'}}>
            <div >
                <PersonalInfo data={{personalInfo: data.personalInfo, departments: data.departments, practice: data.practice}}/>
                <VirtualRecognitions data={data.virtual_recognitions}/>
                
            </div>
            <div>
                <Badges data={data.badges}/>
            </div>
        </div>
    )
}

export default EmployeeProfile