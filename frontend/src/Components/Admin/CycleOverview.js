import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import {Divider, Row, Col, Button} from 'antd';
import axios from 'axios'
import '../components.css';
import InfoCard from '../Employee/InfoCard'
import ActivityList from '../General/ActivityList'
import DisableSwitch from './DisableSwitch'
import Leaderboard from './Leaderboard';
import { useParams, Link } from 'react-router-dom';



function CycleOverview (){
    const [data, setData] = useState([])
    const [current, setCurrent] = useState(false)
    const {id} = useParams()
    
    useEffect(() => {
        const getCycle = async () => {
            const {data} = (await axios.get(`http://localhost:3001/admin/cycle/view/${id}`))
            setData(data)
            setCurrent(data.current)
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
                <Col flex="320px"> 

                <Button style={{marginLeft: '45%'}} type="primary"><Link to={`/admin/cycles/participants/${id}`}> View Cycle Participants </Link></Button>
                 <InfoCard data={data}/> 
                 </Col>
                 <Col flex="auto">
                <ActivityList id={id} className="activities-overview"/> 
                </Col >
            </Row>
                <Row>      
                    <Col flex="auto">
                         <Leaderboard id={id} />
                    </Col>
                 </Row>
        </div>
    )
}
export default CycleOverview;