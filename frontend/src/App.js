import './App.css';
import Activities from './Components/Admin/Activities';
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import AdminHome from './Components/AdminHome';
import AdminCycleHistory from './Components/Admin/AdminCycleHistory';
import CreateActivity from './Components/Admin/CreateActivity';
import ActivityList from './Components/General/ActivityList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import HeaderAdmin from './Components/Navigation/HeaderAdmin';
import SiderAdmin  from './Components/Navigation/SiderAdmin';
import CycleOverview from './Components/General/CycleOverview';

function App() {
  return (
    <Router>
  <Layout>
 
    <Layout   style={{
        height: '50px',
        width: '100%',
        }}>

        <HeaderAdmin />
      </Layout>
  <Layout style={{  display:'flex' , flexDirection :'row'}} >
        <Layout style={{width: '10%'}}>
          <SiderAdmin />
        </Layout>

        <Layout style={{width: '80%', marginRight: '80px' }} >
          <AdminCycleHistory />
            <Route exact path='/' component={AdminHome}/> 
            <Route path='/activities' component={Activities}/> 
            <Route path='/newActivity' component={CreateActivity}/>      
        </Layout>
  </Layout>  

 </Layout>
 </Router>    
  );
}


export default App;
