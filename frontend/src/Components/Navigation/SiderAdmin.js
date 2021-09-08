import React , {useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Link} from 'react-router-dom'
import { Layout, Menu} from 'antd';
import {
  HomeOutlined ,
  SyncOutlined,
  FileDoneOutlined,
  TrophyOutlined,
  SettingOutlined,
  SketchOutlined,
  UserOutlined,
  CrownOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

function SiderAdmin () {

  const [collapsed, SetCollapsed ] = useState(true)

  const onCollapse = collapsed => {
    console.log(collapsed);
    SetCollapsed(collapsed);
  };

    return (
        <div>
           
        <Sider collapsible collapsed={collapsed} 
        onCollapse={onCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          zIndex: '1000',
          left: 0,
        }}>
        
          <Menu id="menu" theme="dark" defaultSelectedKeys={['1']} mode="inline">

            <Menu.Item key="1" icon={<HomeOutlined /> }>
               Home
            </Menu.Item>

            <SubMenu key="sub1" icon={<SyncOutlined  />} title="Cycle">
              <Menu.Item key="2">Cycle Overview</Menu.Item>
              <Menu.Item key="3">Cycle Participants</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<FileDoneOutlined />} title="Activities">
              <Menu.Item key="4">
                  <Link to={'/newActivity'}>Create New Activity</Link>
             </Menu.Item>
              <Menu.Item key="5">
                  <Link to={'/activities'}>All Activites</Link>
             </Menu.Item>
              
            </SubMenu>
            <Menu.Item key="8" icon={<TrophyOutlined />}>
            Leaderboard
            </Menu.Item>
            <Menu.Item key="9" icon={<SettingOutlined />}>
            Settings
            </Menu.Item>
          </Menu>
        </Sider>  
     
      
      </div>
    );
  }


export default SiderAdmin;