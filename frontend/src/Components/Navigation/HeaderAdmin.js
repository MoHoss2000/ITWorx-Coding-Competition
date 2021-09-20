import React from 'react';
import 'antd/dist/antd.css';

import {Avatar, Layout, Menu} from 'antd';

import {CrownOutlined, LogoutOutlined, SketchOutlined, UserOutlined} from '@ant-design/icons';
import { Redirect , Link} from 'react-router-dom';

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
      <div style={{display: 'flex', flexDirection:'row-reverse'}}>
      
      <img src='full.png' className='logo'/>
 
  </div>
     
      <Menu theme="light" mode="horizontal" id="m" defaultSelectedKeys={['1']}>
      
      <Menu.Item key="9"  onClick ={()=>{
         localStorage.clear()
         window.location.reload()
      }} >
        <Link to='/'>
          <LogoutOutlined />
        </Link>
         </Menu.Item>       
        <Menu.Item key="10">
          <Avatar
            style={{backgroundColor: '#87d068',}}
            icon={<UserOutlined/>}/>
        </Menu.Item>
       

      </Menu>
      
      
    </Header>
  );
}

export default HeaderAdmin;
