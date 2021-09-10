import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { List, Card , Button, Avatar, Typography, Divider, Tabs} from 'antd';
import axios from 'axios'
import '../components.css';
import CycleInfo from '../General/CycleInfo'
import ActivityList from '../General/ActivityList'
import DisableSwitch from '../Admin/DisableSwitch'
import { UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import EmployeeLeaderboard from './EmployeeLeaderboard';
import DepartmentLeaderboard from './DepartmentLeaderboard';
import PracticeLeaderboard from './PracticeLeaderboard';
const { Title } = Typography;
const { TabPane } = Tabs;

function Leaderboard (){
    return(
        <div>
            {/* <Title className= "title"> Leaderboard</Title>
            <Divider className="title-divider"/> */}
          
            <Tabs defaultActiveKey="2" centered='true' size='large' tabBarGutter={50} >
                <TabPane
                    tab={<span > <UserOutlined /> Employee  </span> }
                    key="1"
                >
                <EmployeeLeaderboard />
                </TabPane>

                
                <TabPane
                    tab={<span > <UsergroupAddOutlined /> Department </span> }
                    key="3"
                >
                <DepartmentLeaderboard />
                </TabPane>

                <TabPane
                    tab={<span> <UsergroupAddOutlined /> Practice </span> }
                    key="2"
                >
                <PracticeLeaderboard />
                </TabPane>

                </Tabs>
        </div>
    )
}
export default Leaderboard;