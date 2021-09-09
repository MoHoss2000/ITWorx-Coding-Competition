import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import NavBar from './Components/NavBar';
import DescriptionCard from './Components/General/CycleDescriptionCard';
import Leaderboard from './Components/Admin/leaderboard';
import PracticeLeaderboard from './Components/Admin/PracticeLeaderboard';
import DepartmentLeaderboard from './Components/Admin/DepartmentLeaderboard'
import Badges from './Pages/Badges'
import LoginForm from './Components/General/LoginForm'
import PersonalInfo from './Components/Home/PersonalInfo'
=======
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
>>>>>>> f44f5410e7a8c67e3c419b74ca53a724735f50ba


function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <NavBar/>
    </div>
=======
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
   
      <Route exact path='/' component={AdminHome}/> 
      <Route path='/activities' component={Activities}/> 
      <Route path='/newActivity' component={CreateActivity}/>      
  
  </Layout>
</Layout>    
 </Layout>
 </Router>
     
    
>>>>>>> f44f5410e7a8c67e3c419b74ca53a724735f50ba
  );
}


export default App;
