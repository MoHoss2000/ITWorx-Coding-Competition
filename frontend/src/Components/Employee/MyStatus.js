import React, {useState, useEffect, useContext} from 'react'
import {Row, Col, Tabs, Divider, Button, Spin, Drawer} from 'antd'
import axios from 'axios'
import '../components.css'
import ActivitiesDone from './ActivitiesDone'
import VirtualRecognitions from '../EmployeeProfile/VirtualRecognitions'
import BadgesDisplay from '../BadgesDisplay'
import CompletedActivities from './CompletedActivities'
import InfoCard from './InfoCard'
import {  useParams, Link } from 'react-router-dom'
import EmployeePoints from '../General/EmployeePoints'
import { UserContext } from '../../Context'
import MyActivities from './MyActivities'
const { TabPane } = Tabs;

const MyStatus= () => {
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [gainedBadges, setGainedBadges] = useState([])
    const [data, setData] = useState([])
    const {id, cycleId} = useContext(UserContext)
    const cycleID = useParams().id

        useEffect(() => {
        const getStatus = async () => {
            const {data} = await (axios.get(`http://localhost:3001/admin/employeeStatus/${id}/${cycleID}`))
            axios(
              {
                method: 'get',
                url: 'http://localhost:3001/employee/badges',
                headers: {},
                params: {
                  employeeId: id,
                  cycleId
                }
              }).then((res) => {
                setGainedBadges(res.data.gainedBadges)
              })
              .catch((e) => {
                
              })
           
            setData(data)
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
        <div >

            <h1 className= "title"> My Status </h1>
            <Divider className="title-divider"/> 
            
          <div style={{marginLeft: '30px'}}> 
         <Row gutter={0,0}>
             <Col flex="300px">
                 <div style={{display:'flex', flexDirection:'row'}}>
             <EmployeePoints data={data.total_points[0]}/>
             <Button className='butn' onClick={showDrawer}>  Badges <img height='80' src={'/badges/2.png'} />  </Button>
             </div>
             <InfoCard  data={data.cycleInfo[0]}/>
            
            </Col>
          
            <Col flex="auto">
            <Tabs defaultActiveKey="1" centered style={{marginTop:'1%'}}>
                <TabPane tab={<span style={{fontSize:'20px'}}> Activities  </span>} key="2" >
                   {cycleId == cycleID ? <MyActivities divider={true}/> : <CompletedActivities activities={data.completed_activities} /> }

                     
                  </TabPane>

                <TabPane tab={<span style={{fontSize:'20px'}}> Virtual Recognitions  </span>} key="4" >
                  <div className='info-display status-tabs'  >
                   <VirtualRecognitions data={data.virtual_recognitions}/>
                </div>
                </TabPane>

       

     </Tabs>
             </Col>
     </Row>  
           

        </div>
        <Drawer
          width={840}
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
            Badges

            <BadgesDisplay  adminMode={false} data={gainedBadges} span = {12} />
          </p>
        </Drawer>
        </div>
    )
}

export default MyStatus
