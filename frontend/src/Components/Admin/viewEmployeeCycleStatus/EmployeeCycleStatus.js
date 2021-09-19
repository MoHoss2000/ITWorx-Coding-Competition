import React, {useState, useEffect} from 'react'
import {Row, Col, Tabs, Divider, Card, Spin} from 'antd'
import axios from 'axios'
import '../../components.css'
import ActivitiesDone from './ActivitiesDone'
import VirtualRecognitions from '../../EmployeeProfile/VirtualRecognitions'
import BadgesDisplay from '../../BadgesDisplay'
import { useParams } from 'react-router-dom'
import InfoCard from '../../Employee/InfoCard'
import EmployeeCard from '../../General/EmployeeCard'
import EmployeePoints from '../../General/EmployeePoints'
const { TabPane } = Tabs;

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
        return <Spin large/>

    return(
        <div>
            <h1 className= "title"> <b>Employee Status </b></h1>
            <Divider className="title-divider"/> 
            
            <Row gutter={0,0}>
                <Col flex="300px">
                    <EmployeePoints data={data.total_points[0]}/>
                    <EmployeeCard data={data.personalInfo[0]} />
                    <InfoCard data={data.cycleInfo[0]}/>
                </Col>
            <Col flex="auto">
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
                                                <ActivitiesDone data={data.completed_activities} className='activities-view'/> 
                                            </div>
                                        </TabPane>
                                        <TabPane

                                        tab={<span style={{fontSize:'16px'}}> Pending Activities </span>
                                        }
                                        key="2"
                                        >
                                            <div className='profile-components'>
                                            <ActivitiesDone data={data.pending_activities} className='activities-view' /> 
                                            </div>
                                        </TabPane>
                                        <TabPane

                                        tab={
                                            <span style={{fontSize:'16px'}}> In Progress Activities  </span> }
                                        key="3"
                                        >
                                            <div className='profile-components'>
                                            <ActivitiesDone data={data.inprogress_activities} className='activities-view' /> 
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
</Col>
</Row>    
        </div>
    )
}

export default EmployeeCycleStatus

