import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import {Avatar, Layout, Menu} from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import { UserContext } from '../../Context';

const {Header} = Layout;

function HeaderAdmin() {
  const {type} = useContext(UserContext)
  const link = type === 'employee' ? '/employee-profile' : '/admin-profile'
  return (
    <Header className="header" id="header"
            style={{
              overflow: 'auto',
              width: "100%",
              zIndex: '1000',
              left: 0,
            }}>
      <div style={{display: 'flex', flexDirection:'row-reverse'}}>
      
      <img alt="" src='/full.png' className='logo'/>
 
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
          <Link to={link}>
            <Avatar
              style={{backgroundColor: '#87d068',}}
              icon={<UserOutlined/>}/>
          </Link>
        </Menu.Item>
       

      </Menu>
      
      
    </Header>
  );
}

export default HeaderAdmin;
