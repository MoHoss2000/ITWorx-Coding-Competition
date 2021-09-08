import React , {useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
  } from 'react-router-dom'
import { Layout, Menu, Avatar } from 'antd';

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

const { Sider, Header } = Layout;
const { SubMenu } = Menu;

function HeaderAdmin () {

  const [collapsed, SetCollapsed ] = useState(true)

  const onCollapse = collapsed => {
    console.log(collapsed);
    SetCollapsed(collapsed);
  };

    return (
        <Header className="header" id="header"
        style={{
          overflow: 'auto',
          width: "100%",
          zIndex: '1000',
          left: 0,
        }}>
        <Menu theme="light" mode="horizontal" id ="m" defaultSelectedKeys={['1']}>
            <Menu.Item key="10">
                <Avatar
                    style={{backgroundColor: '#87d068', }}
                    icon={<UserOutlined />}/>
            </Menu.Item>
            <Menu.Item key="11" icon={<SketchOutlined />}>Points</Menu.Item>
            <Menu.Item key="12" icon={<CrownOutlined />}>Badges</Menu.Item>      
        </Menu>      
        </Header> 
    );
  }
export default HeaderAdmin;