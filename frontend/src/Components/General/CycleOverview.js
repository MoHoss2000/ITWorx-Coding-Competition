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
            <Title className= "title"> Cycle Overview</Title>
            <div className="switch">
                <p>Disable/Enable Cycle</p>
                <DisableSwitch />
            </div>
            <Divider className="title-divider"/>
           <Row align='top'>
                <Col flex="800px">
    
                <CycleInfo />
                <ActivityList />

                </Col>
                <Col span={12}>
                <Leaderboard style={{width:'100px'}} />
                </Col>
                </Row>
                <Row>
                <Col span={8}>
                    {/* <div style= {{display: 'flex', flexDirection: 'row-reverse'}}> */}
                   
                {/* </div> */}
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