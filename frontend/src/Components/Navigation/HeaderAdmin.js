import React from 'react';
import 'antd/dist/antd.css';

import {Avatar, Layout, Menu} from 'antd';

import {CrownOutlined, SketchOutlined, UserOutlined} from '@ant-design/icons';

const {Header} = Layout;

function HeaderAdmin() {
  return (
    <Header className="header" id="header"
            style={{
              overflow: 'auto',
              width: "100%",
              zIndex: '1000',
              left: 0,
            }}>
      <Menu theme="light" mode="horizontal" id="m" defaultSelectedKeys={['1']}>
        <Menu.Item key="10">
          <Avatar
            style={{backgroundColor: '#87d068',}}
            icon={<UserOutlined/>}/>
        </Menu.Item>
        <Menu.Item key="11" icon={<SketchOutlined/>}>Points</Menu.Item>
        <Menu.Item key="12" icon={<CrownOutlined/>}>Badges</Menu.Item>
        <Menu.Item key="13" >
          <img id="logo" src="full.png"/>
        </Menu.Item>

      </Menu>
    </Header>
  );
}

export default HeaderAdmin;
