import './App.css';
import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';

import AdminCycleHistory from './Components/Admin/AdminCycleHistory';
import CreateActivity from './Components/Admin/CreateActivity';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom'
import HeaderAdmin from './Components/Navigation/HeaderAdmin';
import SiderAdmin  from './Components/Navigation/SiderAdmin';
import ActivityList from './Components/General/ActivityList'
import EmployeeProfile from './Components/EmployeeProfile/EmployeeProfile';
import Activity from "./Components/Admin/Activity";
import Badges from "./Components/Admin/Badges";
import Participants from './Components/Admin/CycleParticipants';
import PendingList from './Components/Admin/PendingOverview';
import NotFound404 from "./Components/NotFound404";
import CycleOverview from './Components/General/CycleOverview';
import Leaderboard from './Components/Admin/leaderboard';
import EmployeeCycleStatus from './Components/Admin/viewEmployeeCycleStatus/EmployeeCycleStatus';
import MyStatus from './Components/Employee/MyStatus';
import EmployeeHome from './Components/HomePages/EmployeeHome';
import AdminHome from './Components/HomePages/AdminHome';
import EmployeeCycleHistory from './Components/Employee/Cycles'


function App() {
  return (
    <Router>
      <Layout>
        <Layout>
          <Layout style={{
            // height: '50px',
            display: 'flex',
            textAlign: 'right',
            width: "100%"
          }}>
            <HeaderAdmin/>
          </Layout>
        </Layout>
        <Layout style={{display: 'flex', flexDirection: 'row', overflow: 'hidden', height: 'calc(100vh - 64px)'}}>

          <Layout style={{flex: 0}}>
            <SiderAdmin/>
    
          </Layout>
          
          <Layout style={{flex: 1, paddingLeft: 50, paddingTop: 50, paddingRight: 20, paddingBottom: 50, overflowY: 'scroll'}}>
           
            <Switch>
              <Route path ='/employeeStatus' component ={EmployeeCycleStatus} />
              <Route path ='/participants' component ={Participants} />
              <Route path ='/leaderboard' component ={Leaderboard} />
              <Route path ='/home' component ={EmployeeHome} />
              <Route path ='/admin/home' component ={AdminHome} />
              <Route path ='/cycleOverview' component ={CycleOverview} />
              <Route path ='/myStatus' component ={MyStatus} />
              <Route exact path='/' component={AdminHome}/>
              <Route path='/newActivity' component={CreateActivity}/>
              <Route path={'/activities/:activityId'} component={Activity} />
              <Route path='/admin/cycles' component={AdminCycleHistory}/> 
              <Route path='/employee/myCycles' component={EmployeeCycleHistory}/> 
              <Route path='/badges' component={Badges}/>
              <Route path='/employee-profile' component={EmployeeProfile}/>
              <Route component={NotFound404}/>
              

            </Switch>
          </Layout>
          
        </Layout>
        
      </Layout>
    </Router>


  );
}


export default App;
