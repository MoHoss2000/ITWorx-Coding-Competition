import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';

import {Link} from 'react-router-dom'
import {Layout, Menu} from 'antd';
import {FileDoneOutlined, HomeOutlined, SettingOutlined, SyncOutlined, TrophyOutlined, BoldOutlined} from '@ant-design/icons';
import { UserContext } from '../../Context';

const {Sider} = Layout;
const {SubMenu} = Menu;


function SiderAdmin() {

  const [collapsed, SetCollapsed] = useState(true)
  
  const onCollapse = collapsed => {
    console.log(collapsed);
    SetCollapsed(collapsed);
  };

  return (
    <div>

      <Sider collapsible collapsed={collapsed}
             onCollapse={onCollapse}
             className='side-bar'
             style={{
               overflow: 'auto',
               height: '100vh',
               zIndex: '10000',
               left: 0,
              
             }}>

        <Menu id="menu" theme='dark' defaultSelectedKeys={['1']} mode="inline">

          <Menu.Item key="1" icon={<HomeOutlined style={{color:'white'}}/>}>
            <Link to={"/admin/home"} style={{color: 'white'}}>Home</Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<SyncOutlined style={{color:'white'}}/>} title="Cycle">
          <Menu.Item key="9">
               <Link to={'/admin/cycles'}>
              Cycle History
              </Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to={`/cycleOverview`}>
              Cycle Overview
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Link to={'/participants'}>
              Cycle Participants
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={'/createCycle'}> Create New Cycle</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<FileDoneOutlined style={{color:'white'}}/>} title="Activities">
            <Menu.Item key="5">
              <Link to={'/newActivity'}>Create New Activity</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to={'/activities'}>All Activities</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="7" icon={<TrophyOutlined style={{color:'white'}}/>}>
            <Link to={'/admin/leaderboard'}>
            Leaderboard
            </Link>
          </Menu.Item>
          <Menu.Item key="12" icon={<BoldOutlined  style={{color:'white'}}/>}>
          <Link to={'/badges'}>
            Badges
            </Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<SettingOutlined style={{color:'white'}}/>}>
            {/*<Link>*/}
            Settings
            {/*</Link>*/}
          </Menu.Item>
        </Menu>
      </Sider>


    </div>
  );
}


export default SiderAdmin;
