import React , {useState, useEffect, useContext} from 'react';
import 'antd/dist/antd.css';
import { Button, Typography, Tabs} from 'antd';
import axios from 'axios'
import '../components.css';
import CycleInfo from '../General/CycleInfo'
import ActivityList from '../General/ActivityList'
import DisableSwitch from './DisableSwitch'
import { UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import EmployeeLeaderboard from './EmployeeLeaderboard';
import DepartmentLeaderboard from './DepartmentLeaderboard';
import PracticeLeaderboard from './PracticeLeaderboard';
import { Redirect } from 'react-router';
import { UserContext } from '../../Context';
const { Title } = Typography;
const { TabPane } = Tabs;

function Leaderboard (){
    const {cycleId} = useContext(UserContext)
    const passDataToParent = async(data) => {
         const cycleID = 1
         axios.get(`http://localhost:3001/admin`)
        
    }
    return(
        <div>
            <Tabs defaultActiveKey="1" centered='true' size='large' tabBarGutter={50} >
                <TabPane
                    tab={<span > <UserOutlined /> Employee  </span> }
                    key="1"
                >
                <EmployeeLeaderboard pass={passDataToParent} id={cycleId}/>
                </TabPane>

                
                <TabPane
                    tab={<span > <UsergroupAddOutlined /> Department </span> }
                    key="2"
                >
                <DepartmentLeaderboard id={cycleId}/>
                </TabPane>

                <TabPane
                    tab={<span> <UsergroupAddOutlined /> Practice </span> }
                    key="3"
                >
                <PracticeLeaderboard id={cycleId}/>
                </TabPane>
               
                </Tabs>
                <Button onClick={passDataToParent}>Export As Excel File</Button>    
        </div>
    )
}
export default Leaderboard; 