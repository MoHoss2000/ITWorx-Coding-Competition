import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { List, Card , Button, Avatar, Typography, Divider, Row, Col} from 'antd';
import axios from 'axios'
import '../components.css';
import ActivitiesDone from '../Admin/viewEmployeeCycleStatus/ActivitiesDone'
import Clock from './Clock'
import Leaderboard from '../Admin/leaderboard';

const { Title } = Typography;


function AdminHome (){

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [profile, setProfile] = useState([])

    useEffect(() => {
        const id = 1
        const cycleID=1
        const getStatus = async () => {
            const {data} = await (axios.get(`http://localhost:3001/admin/pending/${cycleID}`))
            const profile = (await (axios.get(`http://localhost:3001/admin/profile/${id}`))).data
            console.log(data)
            console.log('hi')
            console.log(profile)
            setData(data)
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
                <Card className='welcome-bar'>
                    <Row>
                        <Col>
                        <div className='avatar-block'> 
                         <img className='avatar' src='avatar.png'/> 
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
                    
                
                      <div className='activities-home'>
                      <h4 className= "components-header"> <b> Activities waiting for you to evaluate</b></h4>
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
export default AdminHome;