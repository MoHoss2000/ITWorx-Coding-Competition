import React , {useState, useEffect, useContext} from 'react';
import 'antd/dist/antd.css';
import {Divider, Row, Col, Button} from 'antd';
import axios from 'axios'
import '../components.css';
import CycleInfo from '../General/CycleInfo'
import ActivityList from '../General/ActivityList'
import DisableSwitch from '../Admin/DisableSwitch'
import Leaderboard from '../Admin/Leaderboard';
import {UserContext} from '../../Context'
import { useParams, Link } from 'react-router-dom';



function CycleOverview (){

    const [data, setData] = useState([])
    const [current, setCurrent] = useState(false)
    const {id} = useParams()
    
    useEffect(() => {
        const getCycle = async () => {
            const {data} = (await axios.get(`http://localhost:3001/admin/cycle/view/${id}`))
            console.log(data)
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

                <Link to={`/participants/${id}`}> View Cycle Participants </Link>
                 <CycleInfo data={data} className={'info-display'}/> 
                  <ActivityList id={id} />

                </Col> 
                    <Col span={14}>
                         <Leaderboard id={id} />
                    </Col>
                 </Row>
                
          

            
            
           
           
        </div>
    )
}
export default CycleOverview;