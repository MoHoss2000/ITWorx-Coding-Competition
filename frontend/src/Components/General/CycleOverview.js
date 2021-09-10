import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { List, Card , Button, Avatar, Typography, Divider} from 'antd';
import Spinner from './loadingSpinner'
import axios from 'axios'
import '../components.css';
import CycleInfo from '../General/CycleInfo'
import ActivityList from '../General/ActivityList'
import DisableSwitch from '../Admin/DisableSwitch'
const { Title } = Typography;


function CycleOverview (){
    return(
        <div>
            <Title className= "title"> Cycle Overview</Title>
            <div className="switch">
                Disable/Enable Cycle
            <DisableSwitch />
            </div>
            <Divider className="title-divider"/>
            <CycleInfo />
            <ActivityList />
        </div>
    )
}
export default CycleOverview;