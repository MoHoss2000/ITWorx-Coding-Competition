import React, {useState} from 'react';
import 'antd/dist/antd.css';

import {Link} from 'react-router-dom'
import {Layout, Menu} from 'antd';
import {FileDoneOutlined, HomeOutlined, SettingOutlined, SyncOutlined, TrophyOutlined} from '@ant-design/icons';

const {Sider} = Layout;
const {SubMenu} = Menu;

function EmployeeSider() {

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
               zIndex: '1000',
               left: 0,
              
             }}>

        <Menu id="menu" theme='dark' defaultSelectedKeys={['1']} mode="inline">

          <Menu.Item key="1" icon={<HomeOutlined style={{color:'white'}}/>}>
            <Link to={"/employee/home"} style={{color: 'white'}}>Home</Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<SyncOutlined style={{color:'white'}}/>} title="Cycle">
          <Menu.Item key="9">
               <Link to={'/employee/cycles'}>
              Cycle History
              </Link>
            </Menu.Item>
            <Menu.Item key="10">
              {/* <Link to={''}> */}
              Cycle Overview
              {/* </Link> */}
            </Menu.Item>
        
          </SubMenu>
          <SubMenu key="sub2" icon={<FileDoneOutlined style={{color:'white'}}/>} title="Activities">
            <Menu.Item key="6">
              {/* <Link to={'/activities'}> */}
                  My Activities
                  {/* </Link> */}
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="7" icon={<TrophyOutlined style={{color:'white'}}/>}>
            <Link to={'/employee/leaderboard'}>
            Leaderboard
            </Link>
          </Menu.Item>
          <Menu.Item key="12" icon={<TrophyOutlined  style={{color:'white'}}/>}>
          <Link to={'/myStatus'}>
            My Status
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


export default EmployeeSider;
