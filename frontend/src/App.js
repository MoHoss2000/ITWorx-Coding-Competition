import './App.css';
import Activities from './Components/Admin/Activities';
import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import AdminHome from './Components/AdminHome';
import CreateActivity from './Components/Admin/CreateActivity';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom'
import HeaderAdmin from './Components/Navigation/HeaderAdmin';
import SiderAdmin from './Components/Navigation/SiderAdmin';


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
        <Layout style={{display: 'flex', flexDirection: 'row'}}>

          <Layout style={{flex: 0}}>
            <SiderAdmin/>
          </Layout>
          <Layout style={{flex: 1, paddingLeft: 50, paddingTop: 50}}>
            <Switch>
              <Route exact path='/' component={AdminHome}/>
              <Route path='/activities' component={Activities}/>
              <Route path='/newActivity' component={CreateActivity}/>
            </Switch>
          </Layout>
        </Layout>
      </Layout>
    </Router>


  );
}


export default App;
