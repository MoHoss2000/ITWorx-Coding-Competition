import React, {useState, useEffect, useContext} from 'react'
import {Row, Col, Tabs, Divider, Card, Spin} from 'antd'
import axios from 'axios'
import '../components.css'
import ActivitiesDone from '../Admin/viewEmployeeCycleStatus/ActivitiesDone'
import VirtualRecognitions from '../EmployeeProfile/VirtualRecognitions'
import BadgesDisplay from '../BadgesDisplay'
import CompletedActivities from './CompletedActivities'
import InfoCard from './InfoCard'
import {  useParams } from 'react-router-dom'
import EmployeePoints from '../General/EmployeePoints'
import { UserContext } from '../../Context'
import MyActivities from './MyActivities'
const { TabPane } = Tabs;

const MyStatus= () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const {id, cycleId} = useContext(UserContext)
    const cycleID = useParams().id

    console.log(cycleId, id)
        useEffect(() => {
        const getStatus = async () => {
            const {data} = await (axios.get(`http://localhost:3001/admin/employeeStatus/${id}/${cycleID}`))
            console.log(data)
           
            setData(data)
            setLoading(false)
        } 
        getStatus()
    }, [])

    if(loading)
        return <Spin large/>

    return(
        <div >

            <h1 className= "title"> <b>My Status </b></h1>
            <Divider className="title-divider"/> 
            
         {/* <div style={{display:'flex', flexDirection:'row'}}> */}
         <Row gutter={0,0}>
             <Col flex="300px">
             <EmployeePoints data={data.total_points[0]}/>
             <InfoCard  data={data.cycleInfo[0]}/>
            
            </Col>
            {/* </div> */}
            <Col flex="auto">
            <Tabs defaultActiveKey="1" centered style={{marginTop:'7%'}}>
                <TabPane tab={<span style={{fontSize:'23px'}}> Activities  </span>} key="2" >
                   {cycleId == cycleID ? <MyActivities/> : <CompletedActivities activities={data.completed_activities} /> }

                     
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
