import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { List, Card , Button, Avatar, Typography, Divider, Row, Col} from 'antd';
import Spinner from './loadingSpinner'
import axios from 'axios'
import '../components.css';
import CycleInfo from '../General/CycleInfo'
import ActivityList from '../General/ActivityList'
import DisableSwitch from '../Admin/DisableSwitch'
import Leaderboard from '../Admin/Leaderboard';
const { Title } = Typography;


function CycleOverview (){
    return(
        <div>
            <div className='header-group'>
                <h1 className= "title"> <b>Cycle Overview </b></h1>
                <div className="switch">
                    <p>Disable Cycle</p>
                    <DisableSwitch />
                </div>
            </div>
            <Divider className="title-divider"/>
           <Row align='top'>
                <Col flex="620px">
    
                <CycleInfo />
                <ActivityList />

                </Col>
                <Col span={14}>
                <Leaderboard  />
                </Col>
                </Row>
                
          

            {/* <Row>
                <Col>
                <Leaderboard />
                </Col>
            </Row> */}
            
           
           
        </div>
    )
}
export default CycleOverview;