import React, {useState, useEffect} from 'react'
import {Badge, Descriptions, Row, Col, Tabs, Typography, Divider, Card, Avatar} from 'antd'
import axios from 'axios'
import Spinner from '../../General/loadingSpinner'
import '../../components.css'
import CycleInfo from '../../General/CycleInfo'
import ActivitiesDone from './ActivitiesDone'
import EmployeeProfile from './EmployeeProfile'

import VirtualRecognitions from '../../EmployeeProfile/VirtualRecognitions'
import BadgesDisplay from '../../BadgesDisplay'
import { useParams } from 'react-router-dom'
const { TabPane } = Tabs;
const { Title } = Typography;

const EmployeeCycleStatus= () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const {id, empId} = useParams()
    useEffect(() => {
  
        const getStatus = async () => {
            const { data } = await (axios.get(`http://localhost:3001/admin/employeeStatus/${empId}/${id}`))
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
            <h1 className= "title"> <b>Employee Status </b></h1>
            <Divider className="title-divider"/> 
            
            <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} gutter={[30,8]}>
                <Col>
                    <div className='info-tab' style={{width: '600px'}}>
                        <CycleInfo data={data.cycleInfo[0]} className='status-tab' /> 
                    </div>
                </Col>
                <Col>
                    <div className='info-tab' style={{width: '600px'}}>
                        <EmployeeProfile data={data.personalInfo[0]} />
                    </div>
                </Col>
            </Row>
            
                <Tabs defaultActiveKey="1" centered>

                    <TabPane tab={<span style={{fontSize:'23px'}}> Activities  </span>} key="2" >
                         <div className='info-display info-tab'>
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
                            </div>
                    </TabPane>

                    <TabPane tab={<span style={{fontSize:'23px'}}> Badges  </span>} key="3">
     <div className='status-tabs'>
    <BadgesDisplay  adminMode={false} data={data.badges} />
    </div>
</TabPane>

<                   TabPane tab={<span style={{fontSize:'23px'}}> Virtual Recognitions  </span>} key="4" >
  <div className='info-display status-tabs'  >
   <VirtualRecognitions data={data.virtual_recognitions}/>
</div>
</TabPane>

                </Tabs>

           
        </div>
    )
}

export default EmployeeCycleStatus

