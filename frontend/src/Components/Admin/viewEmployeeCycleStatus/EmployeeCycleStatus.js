import React, {useState, useEffect} from 'react'
import {Badge, Descriptions, Row, Col, Tabs, Typography, Divider, Card, Avatar} from 'antd'
import axios from 'axios'
import Spinner from '../../General/loadingSpinner'
import '../../components.css'
import CycleInfo from '../../General/CycleInfo'
import ActivitiesDone from './ActivitiesDone'
import EmployeeProfile from './EmployeeProfile'
import PersonalInfo from '../../EmployeeProfile/PersonalInfo'
import VirtualRecognitions from '../../EmployeeProfile/VirtualRecognitions'
const { TabPane } = Tabs;
const { Title } = Typography;

const EmployeeCycleStatus= () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        const employeeId = 1
        const cycleID = 1
        const getStatus = async () => {
            const {data} = await (axios.get(`http://localhost:3001/admin/employeeStatus/${employeeId}/${cycleID}`))
            console.log(data)
            setData(data)
            setLoading(false)
        } 
        getStatus()
    }, [])

    if(loading)
        return <Spinner/>

    return(
        <div >
            <Title className= "title"> Employee Cycle Status</Title>
            <Divider className="title-divider"/> 
            <Row gutter={[100,8]}>
                <Col>
                    <EmployeeProfile data={data.personalInfo[0]} />
                </Col>
                <Col>
                     <CycleInfo data={data.cycleInfo[0]}/>
                </Col>
            </Row>
            <Row gutter={[100,8]}>
                <Col>
                    <Card className='activities-container'>
                        <Tabs defaultActiveKey="1" centered='true' size='large' tabBarGutter={30}>
                            <TabPane
                                tab={<span style={{fontSize:'16px'}}> Completed Activities  </span>}
                                key="1"
                            >
                                <div className='profile-components'>
                                    <ActivitiesDone data={data.completed_activities} /> 
                                </div>
                            </TabPane>

                            <TabPane
            
                            tab={<span style={{fontSize:'16px'}}> Pending Activities </span>
                            }
                            key="2"
                            >
                                <div className='profile-components'>
                                <ActivitiesDone data={data.pending_activities}  /> 
                                </div>
                            </TabPane>
                            <TabPane
            
                            tab={
                                <span style={{fontSize:'16px'}}> In Progress Activities  </span> }
                            key="3"
                            >
                                <div className='profile-components'>
                                <ActivitiesDone data={data.inprogress_activities}  /> 
                                </div>
                            </TabPane>
                    
                        </Tabs>
                        </Card>
                </Col>

                <Col>
                <div className='info-display'>
                   <VirtualRecognitions data={data.virtual_recognitions}/>
                </div>
                </Col>
            </Row>
        </div>
    )
}

export default EmployeeCycleStatus
