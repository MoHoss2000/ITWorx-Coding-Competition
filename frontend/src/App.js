import './App.css';
import Activities from './Components/Admin/Activities';
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import AdminHome from './Components/AdminHome';
import CreateActivity from './Components/Admin/CreateActivity';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import HeaderAdmin from './Components/Navigation/HeaderAdmin';
import SiderAdmin  from './Components/Navigation/SiderAdmin';
import ActivityList from './Components/General/ActivitiesOverview'

function App() {
  return (
    <Router>
  <Layout>
  <Layout >
  <Layout   style={{
   height: '50px',
   display: 'flex',
   textAlign:"center",
   width: "100%"
   }}>
   <HeaderAdmin/>
    </Layout>
  </Layout>
 <Layout style={{  display:'flex' , flexDirection :'row'}} >
   
  <Layout style={{width: '20%' }}>
    <SiderAdmin/>
  </Layout>
  <Layout style={{width: '80%' }} >
    <ActivityList/>
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
