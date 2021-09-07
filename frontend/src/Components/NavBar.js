import React , {useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import DescriptionCard from './General/CycleDescriptionCard'
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
import DisableSwitch from './Admin/DisableSwitch';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function NavBar (props) {
  const [collapsed, SetCollapsed ] = useState(true)

  const onCollapse = collapsed => {
    console.log(collapsed);
    SetCollapsed(collapsed);
  };

    // const { collapsed } = this.state;
    return (
        <div>
      <Layout style={{ minHeight: '100vh'}}>
        
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        
          <Menu id="menu" theme="dark" defaultSelectedKeys={['1']} mode="inline">

            <Menu.Item key="1" icon={<HomeOutlined /> }>
               Home
            </Menu.Item>

            <SubMenu key="sub1" icon={<SyncOutlined  />} title="Cycle">
              <Menu.Item key="2">Cycle Overview</Menu.Item>
              <Menu.Item key="3">Cycle Participants</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<FileDoneOutlined />} title="Activities">
              <Menu.Item key="4">Create New Activity</Menu.Item>
              <Menu.Item key="5">Pending Activities</Menu.Item>
              <Menu.Item key="6">Completed Activities</Menu.Item>
              <Menu.Item key="7">In Progress Activities</Menu.Item>
            </SubMenu>
            <Menu.Item key="8" icon={<TrophyOutlined />}>
            Leaderboard
            </Menu.Item>
            <Menu.Item key="9" icon={<SettingOutlined />}>
            Settings
            </Menu.Item>
            
        
          </Menu>
        </Sider>
      
      <Layout  >
        <Header className="header" id="header">
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
        <DisableSwitch />
        </Layout>
        
      </Layout>
      </div>
    );
  }


export default NavBar;