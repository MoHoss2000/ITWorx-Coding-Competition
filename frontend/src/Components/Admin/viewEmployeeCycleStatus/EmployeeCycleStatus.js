import React, {useState, useEffect} from 'react'
import {Row, Col, Tabs, Divider, Card, Spin, Drawer, Button} from 'antd'
import axios from 'axios'
import '../../components.css'
import VirtualRecognitions from '../../EmployeeProfile/VirtualRecognitions'
import BadgesDisplay from '../../BadgesDisplay'
import { useParams } from 'react-router-dom'
import InfoCard from '../../Employee/InfoCard'
import EmployeeCard from '../../General/EmployeeCard'
import EmployeePoints from '../../General/EmployeePoints'
import StatusActivities from './StatusActivities'
const { TabPane } = Tabs;

const EmployeeCycleStatus= () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const {id, empId} = useParams()
    useEffect(() => {
  
        const getStatus = async () => {
            const { data } = await (axios.get(`http://localhost:3001/admin/employeeStatus/${empId}/${id}`))
            console.log(data)
            setData(data)
            console.log(data.badges)
            setLoading(false)
        } 
        getStatus()
    }, [])

    const showDrawer = () => {
        setVisible(true)
      };
    
    const onClose = () => {
          setVisible(false)
      };

    if(loading)
        return <Spin large/>

    return(
        <div>
            <h1 className= "title"> <b>Employee Status </b></h1>
            <Divider className="title-divider"/> 
            
            <Row gutter={0,0}>
                <Col flex="300px">
                <div style={{display:'flex', flexDirection:'row'}}>
                <EmployeePoints data={data.total_points[0]}/>
                <Button className='butn' onClick={showDrawer}>  Badges <img height='80' src={'/badges/2.png'} />  </Button>
                </div>
                    <EmployeeCard data={data.personalInfo[0]} />
                    <InfoCard data={data.cycleInfo[0]}/>
                </Col>
            <Col flex="auto">
                <Tabs defaultActiveKey="1" centered style={{margin:'50px 40px'}}>
                    <TabPane tab={<span style={{fontSize:'23px'}}> Activities  </span>} key="2" >
                         <div className='info-display info-tab'>
                                <Card className='activities-container'>
                                    <Tabs defaultActiveKey="1" centered='true' size='large' tabBarGutter={30}>
                                        <TabPane
                                            tab={<span style={{fontSize:'16px'}}> Completed Activities  </span>}
                                            key="1"
                                        >
                                            <div className='profile-components'>
                                                <StatusActivities data={data.completed_activities} className='activities-view'/> 
                                            </div>
                                        </TabPane>
                                        <TabPane

                                        tab={<span style={{fontSize:'16px'}}> Pending Activities </span>
                                        }
                                        key="2"
                                        >
                                            <div className='profile-components'>
                                            <StatusActivities data={data.pending_activities} className='activities-view' /> 
                                            </div>
                                        </TabPane>
                                        <TabPane

                                        tab={
                                            <span style={{fontSize:'16px'}}> In Progress Activities  </span> }
                                        key="3"
                                        >
                                            <div className='profile-components'>
                                            <StatusActivities data={data.inprogress_activities} className='activities-view' /> 
                                            </div>
                                        </TabPane>
                                
                                    </Tabs>
                                </Card>
                            </div>
                    </TabPane>

                    <TabPane tab={<span style={{fontSize:'23px'}}> Virtual Recognitions  </span>} key="4" >
                        <div className='info-display status-tabs'  >
                        <VirtualRecognitions data={data.virtual_recognitions}/>
                        </div>
                     </TabPane>

</Tabs>
</Col>
</Row>    
<Drawer
          width={840}
          placement="right"
          onClose={onClose}
          visible={visible}
          title="Employee Badges"
        >
          <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
            Badges   
          </p>

            <BadgesDisplay  adminMode={false} data={data.badges} span = {12} />

        </Drawer>
        </div>
    )
}

export default EmployeeCycleStatus

