import './App.css';
import Activities from './Components/Admin/Activities';
import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import AdminHome from './Components/AdminHome';
import CycleInfo from './Components/General/CycleInfo';
import CreateActivity from './Components/Admin/CreateActivity';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom'
import HeaderAdmin from './Components/Navigation/HeaderAdmin';
import SiderAdmin from './Components/Navigation/SiderAdmin';
import Activity from "./Components/Admin/Activity";
import NotFound404 from "./Components/NotFound404";
import CreateCycle from './Components/Admin/CreateCycle';
import EditActivity from './Components/Admin/EditActivity';


function App() {
  return (
    <Router>
      <Layout>
        <Layout>
          <Layout style={{
            // height: '50px',
            display: 'flex',
            textAlign: "center",
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
              <Route exact path='/' component={AdminHome}/>
              <Route path='/newActivity' component={CreateActivity}/>
              <Route path={'/activities/:id'} component={Activity} />
              <Route path='/activities' component={Activities}/>
              <Route path='/createCycle' component={CreateCycle}/>
              <Route path='/editActivity/:id' component={EditActivity}/>
              <Route component={NotFound404}/>
            </Switch>
          </Layout>
        </Layout>
      </Layout>
    </Router>


  );
}


export default App;
