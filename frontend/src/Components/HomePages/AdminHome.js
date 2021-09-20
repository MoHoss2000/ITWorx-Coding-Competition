import React , {useState, useEffect, useContext} from 'react';
import 'antd/dist/antd.css';
import { List, Card , Button, Avatar, Typography, Divider, Row, Col, Spin} from 'antd';
import axios from 'axios'
import '../components.css';
import PendingOverview from '../Admin/PendingOverview'
import ActivitiesDone from '../Admin/viewEmployeeCycleStatus/ActivitiesDone'
import Clock from './Clock'
import Leaderboard from '../Admin/Leaderboard';
import { UserContext } from '../../Context';

const { Title } = Typography;


function AdminHome (){

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [profile, setProfile] = useState([])
    const {id, cycleId} = useContext(UserContext)

    useEffect(() => {
        const getStatus = async () => {
            const {data} = await (axios.get(`http://localhost:3001/admin/pending/${cycleId}`))
            const profile = (await (axios.get(`http://localhost:3001/admin/profile/${id}`))).data
            setData(data.slice(0,3))
            setProfile(profile)
            setLoading(false)
        } 
        getStatus()
    }, [])

    if(loading)
        return <Spin size='large' />
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
                        <h1 className='welcome-statement'> {'Welcome Back, ' + profile.first_name + ' '+ profile.last_name +'!'} </h1>
                        <h2 className='welcome-line'> Glad to see you again!</h2>
                        </Col>
                    </Row>
                </Card>
            </Row>
            
            <Row gutter={[80, 0]} >
                <div  className='rowsss' >
                    <div>
                    <h1 className= "clock-header"> <b>Cycle Remaining Time </b></h1>
                        <Clock />
                    </div>
                    
                
                      <div className='activities-home-container'>
                      <h4 className= "components-header"> <b> Activities waiting for you to evaluate</b></h4>
                     <PendingOverview data={data} className='activities-home' /> 
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
export default AdminHome;