import React, {useState, useEffect} from 'react'
import {Badge, Descriptions, Row, Col, Typography, Divider} from 'antd'
import axios from 'axios'
import PersonalInfo from './PersonalInfo'
import Spinner from '../General/loadingSpinner'
import VirtualRecognitions from './VirtualRecognitions'
import Badges from './Badges'
const { Title } = Typography;

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
        <div>
            <Title className= "title" style={{fontSize: '35px'}}>Employee Profile</Title>
            <Divider className="title-divider"/>
        <div style={{width:'100%' , display: 'flex', flexWrap: 'wrap'}}>
            <Row justify='center' align='top' gutter={[40,8]}>
                <Col>
                    <PersonalInfo data={{personalInfo: data.personalInfo, departments: data.departments, practice: data.practice}}/>
                </Col>

                <Col>
                    <VirtualRecognitions data={data.virtual_recognitions}/>
                </Col>
            </Row>
            <Row justify='center' align='top' gutter={[40,8]}>
                <Col>
                    <Badges data={data.badges}/>
                </Col>
            </Row>    
        </div>
        </div>
    )
}

export default EmployeeProfile