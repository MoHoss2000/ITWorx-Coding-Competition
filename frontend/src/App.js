import './App.css';
import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import Login from './Components/General/Login';
import AdminCycleHistory from './Components/Admin/AdminCycleHistory';
import CreateActivity from './Components/Admin/CreateActivity';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom'
import HeaderAdmin from './Components/Navigation/HeaderAdmin';
import SiderAdmin from './Components/Navigation/SiderAdmin';
import Activity from "./Components/Admin/Activity";
import Badges from "./Components/Admin/Badges";
import Participants from './Components/Admin/CycleParticipants';
import NotFound404 from "./Components/NotFound404";
import CreateCycle from './Components/Admin/CreateCycle';
import EditActivity from './Components/Admin/EditActivity';
import CycleOverview from './Components/Admin/CycleOverview';
import Leaderboard from './Components/Admin/Leaderboard';
import EmployeeCycleStatus from './Components/Admin/viewEmployeeCycleStatus/EmployeeCycleStatus';
import MyStatus from './Components/Employee/MyStatus';
import EmployeeHome from './Components/HomePages/EmployeeHome';
import AdminHome from './Components/HomePages/AdminHome';
import EmployeeCyclesHistory from './Components/Employee/EmployeeCyclesHistory'
import Activities from './Components/Admin/Activities'
import ChangePassword from './Components/General/ChangePassword';
import AdminProfile from './Components/Admin/AdminProfile/AdminProfile'
import ForgotPassword from './Components/General/ForgotPassword';
import ResetPassword from './Components/General/ResetPassword';
import PrivateRouteAdmin from './Components/Router/PrivateRouteAdmin';
import PrivateRouteEmployee from './Components/Router/PrivateRouteEmployee';
import {UserContext} from "./Context";
import Unauthorized from "./Components/Unauthorized"
import EmployeeSider from './Components/Navigation/EmployeeSider';
import MyActivities from './Components/Employee/MyActivities';
import AllActivities from './Components/Employee/AllActivities';
import NetworkError from './Components/NetworkError';
import Profile from './Components/EmployeeProfile/Profile';
import ProgressBar from './Components/HomePages/ProgressBar';
import PendingActivities from './Components/Admin/PendingActivities'



function App() {

  const {id, type} = useContext(UserContext)
  return (
    <Router>
      <Layout>
        <Layout style={{
            // height: '50px',
            padding: "0px",
            width: "100%"}}>
          
            {id && <HeaderAdmin/>}
          
        </Layout>
        <Layout style={{display: 'flex', flexDirection: 'row', overflow: 'hidden', height: 'calc(100vh - 64px)'}}>

          <Layout style={{flex: 0}}>

            {type === 'admin' && <SiderAdmin/>}
            {type === 'employee' && <EmployeeSider/>}

          </Layout>

          <Layout style={{
            flex: 1,
            paddingLeft: 50,
            paddingTop: 50,
            paddingRight: 20,
            paddingBottom: 50,
            overflowY: 'scroll'
          }}>

            <Switch>
              <PrivateRouteAdmin path='/admin/cycles/participants/:id' component={Participants}/>
              <PrivateRouteAdmin path='/admin/cycles/overview/:id' component={CycleOverview}/>
              <PrivateRouteAdmin path='/admin/cycles' component={AdminCycleHistory}/>
              <PrivateRouteAdmin path='/admin/employeeStatus/:id/:empId' component={EmployeeCycleStatus}/>
              <PrivateRouteAdmin path='/admin-profile' component={AdminProfile}/>
              <PrivateRouteAdmin path='/admin/leaderboard' component={Leaderboard}/>
              <PrivateRouteAdmin path='/newActivity' component={CreateActivity}/>
              <PrivateRouteAdmin path='/admin/home' component={AdminHome}/>
              <PrivateRouteAdmin path={'/activities/:id'} component={Activity}/>
              <PrivateRouteAdmin path='/activities' component={Activities}/>
              <PrivateRouteAdmin path={'/createCycle'} component={CreateCycle}/>
              <PrivateRouteAdmin path='/editActivity/:id' component={EditActivity}/>
              <PrivateRouteAdmin path={'/activities/:activityId'} component={Activity}/>
              <PrivateRouteAdmin path='/badges' component={Badges}/>
              <PrivateRouteAdmin path='/pending' component={PendingActivities}/>
                              
              <PrivateRouteEmployee path='/employee/home' component={EmployeeHome}/>
              <PrivateRouteEmployee path='/employee/leaderboard' component={Leaderboard}/>
              <PrivateRouteEmployee path='/employee-profile' component={Profile}/>
              <PrivateRouteEmployee path='/myActivities' component={MyActivities}/>
              <PrivateRouteEmployee path='/allActivities' component={AllActivities}/>
              <PrivateRouteEmployee path='/progress' component={ProgressBar}/> 
              <PrivateRouteEmployee path='/employee/cycles/:id/:empId' component={MyStatus}/>        
              <PrivateRouteEmployee path='/employee/cycles' component={EmployeeCyclesHistory}/> 
              <PrivateRouteEmployee path='/myActivities' component={MyActivities}/>
            
              <Route path='/unauthorized' component={Unauthorized}/>
              <Route path='/networkError' component={NetworkError}/>
              <Route path='/changePassword' component={ChangePassword}/>
              <Route path='/resetPassword/:token' component={ResetPassword}/>
              <Route path='/forgotPassword' component={ForgotPassword}/>
              <Route exact path='/' component={Login}/>
              
              <Route component={NotFound404}/>


            </Switch>
          </Layout>
        </Layout>
      </Layout>
    </Router>


  );
}


export default App;
