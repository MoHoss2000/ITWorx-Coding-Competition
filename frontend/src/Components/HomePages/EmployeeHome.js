import React , {useState, useEffect, useContext} from 'react';
import 'antd/dist/antd.css';
import { Card , Row, Col} from 'antd';
import axios from 'axios'
import '../components.css';
import ActivitiesDone from '../Employee/ActivitiesDone'
import Clock from './Clock'
import Leaderboard from '../Admin/Leaderboard';
import { UserContext } from '../../Context';
import ProgressBar from './ProgressBar';



function EmployeeHome (){

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [profile, setProfile] = useState([])
    const {id, cycleId} = useContext(UserContext)
    useEffect(() => {
  
        const getStatus = async () => {
            
            const {data} = await (axios.get(`http://localhost:3001/employee/currentActivities/${id}`))
            const profile = (await (axios.get(`http://localhost:3001/employee/profile/${id}/${cycleId}`))).data
            console.log(data)
            setData(data.slice(0,3))
            setProfile(profile)
            setLoading(false)
        } 
        getStatus()
    }, [])

    if(loading)
        return <div></div>
    else{
    return(
        <div >  
            
            <Row>
                <Card className='welcome-bar ocean'>
                <div className='wave'> </div>
                <div className='wave'> </div>
                    <Row>
                        <Col>
                        <div className='avatar-block'> 
                         <img alt="" className='avatar' src='/avatar.png'/> 
                         </div>
                        </Col>
                        <Col>
                        <h1 className='welcome-statement'> {'Welcome Back, ' + profile.personalInfo[0].first_name + ' '+ profile.personalInfo[0].last_name +'!'} </h1>
                        <h2 className='welcome-line'> Glad to see you again! Here's how you can start your day...</h2>
                        
                        </Col>
                    </Row>
                </Card>
            </Row>
            
            <Row gutter={[80, 0]} >
                <div  className='rowsss' >
                    <Col>
                    <div>
                    <h1 className= "clock-header"> <b>Cycle Remaining Time </b></h1>
                        <Clock />
                    </div>
                    <Card style={{marginTop:'40px', marginLeft:'20px',backgroundColor:'rgb(255,255,255,0.5)', boxShadow: '1px 8px 30px 0 #2196f3'}}>
                    <ProgressBar/>
                    </Card>
                </Col>
                      <div className='activities-home-container'>
                      <h4 className= "components-header"> <b> Some of the activities waiting for you</b></h4>
                     <ActivitiesDone data={data} /> 
                     </div>
                </div>
            </Row>
           
            
            <Row>
                <Col >
                <Leaderboard />
                </Col>
            </Row>  
              
            
           
 
        </div>
    )
    }
}
export default EmployeeHome;