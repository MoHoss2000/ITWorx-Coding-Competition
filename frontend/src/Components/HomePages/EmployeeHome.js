import React , {useState, useEffect, useContext} from 'react';
import 'antd/dist/antd.css';
import { List, Card , Button, Avatar, Typography, Divider, Row, Col} from 'antd';
import axios from 'axios'
import '../components.css';
import ActivitiesDone from '../Employee/ActivitiesDone'
import Clock from './Clock'
import Leaderboard from '../Admin/Leaderboard';
import { UserContext } from '../../Context';
import ProgressBar from './ProgressBar';

const { Title } = Typography;


function EmployeeHome (){

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [profile, setProfile] = useState([])
    const {id, cycleId} = useContext(UserContext)
    useEffect(() => {
  
        const getStatus = async () => {
            
            console.log(cycleId)
            console.log(id)
            const {data} = await (axios.get(`http://localhost:3001/employee/currentActivities/${id}`))
            const profile = (await (axios.get(`http://localhost:3001/employee/profile/${id}/${cycleId}`))).data
            console.log(data)
            setData(data.slice(0,2))
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
                         <img className='avatar' src='/avatar.png'/> 
                         </div>
                        </Col>
                        <Col>
                        <h1 className='welcome-statement'> {'Welcome Back, ' + profile.personalInfo[0].first_name + ' '+ profile.personalInfo[0].last_name +'!'} </h1>
                        <h3 className='welcome-line'> Glad to see you again!</h3>
                        
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
                    <Card style={{marginTop:'40px', marginLeft:'20px',backgroundColor:'rgb(255,255,255,0.5)', boxShadow: '1px 8px 30px 0 grey'}}>
                    <ProgressBar/>
                    </Card>
                </Col>
                      <div className='activities-home-container'>
                      <h1 className= "components-header"> <b> Activities waiting for you</b></h1>
                     <ActivitiesDone data={data} className='activities-home' /> 
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