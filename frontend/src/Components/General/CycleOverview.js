import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { List, Card , Button, Avatar, Typography, Divider, Row, Col} from 'antd';
import Spinner from './loadingSpinner'
import axios from 'axios'
import '../components.css';
import CycleInfo from '../General/CycleInfo'
import ActivityList from '../General/ActivityList'
import DisableSwitch from '../Admin/DisableSwitch'
import Leaderboard from '../Admin/leaderboard';
const { Title } = Typography;


function CycleOverview (){

    const [data, setData] = useState([])
    const [current, setCurrent] = useState(false)
  
    useEffect(() => {
        const getCycle = async () => {
            const cycleID = 1
            const {data} = (await axios.get(`http://localhost:3001/admin/cycle/view/${cycleID}`))
            setData(data)
            setCurrent(data.current)
            console.log(data.current == true)
        }
        getCycle()
    }, [])

    return(
        <div>
             <div className='header-group'>
                <h1 className= "title"> <b>Cycle Overview </b></h1>
                <div className="switch">
                    <DisableSwitch current={current} />
                </div>
            </div>
            <Divider className="title-divider"/>
           <Row align='top'>
                <Col flex="620px"> 
{   
                 <CycleInfo data={data}/> }
                  <ActivityList />

                </Col> 
                    <Col span={14}>
                         <Leaderboard  />
                    </Col>
                 </Row>
                
          

            <Row>
                <Col>
                <Leaderboard />
                </Col>
            </Row>
            
           
           
        </div>
    )
}
export default CycleOverview;