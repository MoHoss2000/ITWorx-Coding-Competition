import './App.css';
import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';

import AdminCycleHistory from './Components/Admin/AdminCycleHistory';
import CreateActivity from './Components/Admin/CreateActivity';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom'
import HeaderAdmin from './Components/Navigation/HeaderAdmin';
import SiderAdmin  from './Components/Navigation/SiderAdmin';
import EmployeeProfile from './Components/EmployeeProfile/EmployeeProfile';
import Activity from "./Components/Admin/Activity";
import Badges from "./Components/Admin/Badges";
import Participants from './Components/Admin/CycleParticipants';
import NotFound404 from "./Components/NotFound404";
import CreateCycle from './Components/Admin/CreateCycle';
import EditActivity from './Components/Admin/EditActivity';
import CycleOverview from './Components/General/CycleOverview';
import Leaderboard from './Components/Admin/Leaderboard';
import EmployeeCycleStatus from './Components/Admin/viewEmployeeCycleStatus/EmployeeCycleStatus';
import MyStatus from './Components/Employee/MyStatus';
import EmployeeHome from './Components/HomePages/EmployeeHome';
import AdminHome from './Components/HomePages/AdminHome';
import EmployeeCycleHistory from './Components/Employee/Cycles'
import Activities from './Components/Admin/Activities'
import ChangePassword from './Components/General/ChangePassword';
import AdminProfile from './Components/Admin/AdminProfile/AdminProfile'
import LoginForm from './Components/General/LoginForm';
import ForgotPassword from './Components/General/ForgotPassword';
import ResetPassword from './Components/General/ResetPassword';

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
              <Route path ='/changePassword' component ={ChangePassword} />
              <Route path ='/employeeStatus' component ={EmployeeCycleStatus} />
              <Route path ='/adminProfile' component ={AdminProfile} />
              <Route path ='/participants' component ={Participants} />
              <Route path ='/leaderboard' component ={Leaderboard} />
              <Route path ='/home' component ={EmployeeHome} />
              <Route path ='/admin/home' component ={AdminHome} />
              <Route path ='/cycleOverview' component ={CycleOverview} />
              <Route path ='/myStatus' component ={MyStatus} />
              <Route exact path='/' component={AdminHome}/>
              <Route path='/newActivity' component={CreateActivity}/>
              <Route path={'/activities/:id'} component={Activity} />
              <Route path='/activities' component={Activities}/> 
              <Route path='/createCycle' component={CreateCycle}/>
              <Route path='/editActivity/:id' component={EditActivity}/>
              <Route path={'/activities/:activityId'} component={Activity} />
              <Route path='/admin/cycles' component={AdminCycleHistory}/> 
              <Route path='/employee/myCycles' component={EmployeeCycleHistory}/> 
              <Route path='/badges' component={Badges}/>
              <Route path='/employee-profile' component={EmployeeProfile}/>
              <Route path='/login' component={LoginForm}/>
              <Route path='/resetPassword/:token' component={ResetPassword}/>
              <Route path='/forgotPassword' component={ForgotPassword}/>

              <Route component={NotFound404}/>
    
            </Switch>
          </Layout>
        </Layout>
      </Layout>
    </Router>


  );
}


export default App;
