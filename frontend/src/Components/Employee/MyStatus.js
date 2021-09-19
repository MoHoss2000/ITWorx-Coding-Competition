import React, {useState, useEffect} from 'react'
import {Badge, Descriptions, Row, Col, Tabs, Typography, Divider, Card, Avatar} from 'antd'
import axios from 'axios'
import Spinner from '../General/loadingSpinner'
import '../components.css'
import CycleInfo from '../General/CycleInfo'
import ActivitiesDone from '../Admin/viewEmployeeCycleStatus/ActivitiesDone'
import VirtualRecognitions from '../EmployeeProfile/VirtualRecognitions'
import BadgesDisplay from '../BadgesDisplay'
import InfoCard from './InfoCard'
import {
    BrowserRouter as Router,
    Link, useParams
  } from 'react-router-dom'
import MyPoints from './MyPoints'
const { TabPane } = Tabs;
const { Title } = Typography;

const MyStatus= () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const {id, empId} = useParams()
    useEffect(() => {
        const getStatus = async () => {
            const {data} = await (axios.get(`http://localhost:3001/admin/employeeStatus/${empId}/${id}`))
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

            <h1 className= "title"> <b>My Status </b></h1>
            <Divider className="title-divider"/> 
            
         {/* <div style={{display:'flex', flexDirection:'row'}}> */}
         <Row gutter={0,0}>
             <Col flex="300px">
             <MyPoints data={data.total_points[0]}/>
             <InfoCard  data={data.cycleInfo[0]}/>
            
            </Col>
            {/* </div> */}
            <Col flex="auto">
            <Tabs defaultActiveKey="1" centered style={{marginTop:'7%'}}>

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

                <TabPane tab={<span style={{fontSize:'23px'}}> Virtual Recognitions  </span>} key="4" >
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

export default MyStatus
