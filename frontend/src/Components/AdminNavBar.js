import React , {useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
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

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminNavBar (props) {
  const [collapsed, SetCollapsed ] = useState(true)

  const onCollapse = collapsed => {
    console.log(collapsed);
    SetCollapsed(collapsed);
  };

    // const { collapsed } = this.state;
    return (
        <div>
      <Router>
      <Layout style={{ minHeight: '100vh'}}>
        
        <Sider collapsible collapsed={collapsed} 
        onCollapse={onCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
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
      
       <Layout >
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
        </Layout>
        
      </Layout>
      </Router>
      </div>
    );
  }


export default AdminNavBar;