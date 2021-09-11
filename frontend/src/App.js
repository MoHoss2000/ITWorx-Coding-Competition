import './App.css';
import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import AdminHome from './Components/AdminHome';
import AdminCycleHistory from './Components/Admin/AdminCycleHistory';
import CreateActivity from './Components/Admin/CreateActivity';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom'
import HeaderAdmin from './Components/Navigation/HeaderAdmin';
import SiderAdmin  from './Components/Navigation/SiderAdmin';
import ActivityList from './Components/General/ActivityList'
import EmployeeProfile from './Components/EmployeeProfile/EmployeeProfile';
import Activity from "./Components/Admin/Activity";
import Badges from "./Components/Admin/Badges";
import CreateBadge from "./Components/Admin/CreateBadge";
import Participants from './Components/Admin/CycleParticipants';
import PendingList from './Components/Admin/PendingOverview';
import EmployeeStatus from './Components/Admin/EmployeeStatus';
import NotFound404 from "./Components/NotFound404";
import CycleOverview from './Components/General/CycleOverview';
import Leaderboard from './Components/Admin/Leaderboard';


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
              <Route path ='/participants' component ={Participants} />
              <Route path ='/leaderboard' component ={Leaderboard} />
              <Route path ='/cycleOverview' component ={CycleOverview} />
              <Route exact path='/' component={AdminHome}/>
              <Route path='/newActivity' component={CreateActivity}/>
              <Route path={'/activities/:activityId'} component={Activity} />
              {/* <Route path='/activities' component={Activities}/> */}
              <Route path='/badges' component={Badges}/>
              <Route path='/newBadge' component={CreateBadge}/>
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
