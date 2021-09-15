import React , {useState, useEffect} from 'react';
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
const { Title } = Typography;
const { TabPane } = Tabs;

function Leaderboard (){

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
                <EmployeeLeaderboard pass={passDataToParent}/>
                </TabPane>

                
                <TabPane
                    tab={<span > <UsergroupAddOutlined /> Department </span> }
                    key="2"
                >
                <DepartmentLeaderboard />
                </TabPane>

                <TabPane
                    tab={<span> <UsergroupAddOutlined /> Practice </span> }
                    key="3"
                >
                <PracticeLeaderboard />
                </TabPane>
               
                </Tabs>
                <Button onClick={passDataToParent}>Export As Excel File</Button>    
        </div>
    )
}
export default Leaderboard; 