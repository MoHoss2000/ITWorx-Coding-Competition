import React, {useState, useEffect} from 'react'
import {Badge, Descriptions, Row, Col, Tabs, Typography, Divider, Card, Avatar} from 'antd'
import axios from 'axios'
import Spinner from '../General/loadingSpinner'
import '../components.css'
import CycleInfo from '../General/CycleInfo'
import ActivitiesDone from '../Admin/viewEmployeeCycleStatus/ActivitiesDone'
import VirtualRecognitions from '../EmployeeProfile/VirtualRecognitions'
import BadgesDisplay from '../BadgesDisplay'
import {
    BrowserRouter as Router,
    Link, useParams
  } from 'react-router-dom'
const { TabPane } = Tabs;
const { Title } = Typography;

const MyStatus= () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const {id, cycle_id} = useParams()

    useEffect(() => {
        const getStatus = async () => {
            const {data} = await (axios.get(`http://localhost:3001/admin/employeeStatus/${id}/${cycle_id}`))
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
                    <div className='info-tab'>
                          <CycleInfo data={data.cycleInfo[0]} className='status-tab' />
                     </div>
                
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

                <TabPane tab={<span style={{fontSize:'23px'}}> Virtual Recognitions  </span>} key="4" >
                  <div className='info-display status-tabs'  >
                   <VirtualRecognitions data={data.virtual_recognitions}/>
                </div>
                </TabPane>

       

     </Tabs>


           


        </div>
    )
}

export default MyStatus
