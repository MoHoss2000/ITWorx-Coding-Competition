import react ,{ useContext} from 'react';
import 'antd/dist/antd.css';
import { Card, Button, Layout,Divider, Typography} from 'antd';
import {SyncOutlined, CarryOutOutlined} from '@ant-design/icons';
import '../components.css';
import {UserContext} from '../../Context'
import {
    BrowserRouter as Router,
    Link,
  } from 'react-router-dom'


const CycleList = (props) =>{  
  const {id, cycleId} =useContext(UserContext)
  console.log(props)
  return( 
   <div>
      
      <h1 className= "title"> <b> My Cycles History </b></h1>
      <Divider className="title-divider"/>
     <div style={{display:'flex', flexWrap:'wrap'}}> 
      {
      
       props.cycles.map ( ({cycle_id, start_date, end_date}) => {
        if (cycle_id ==cycleId){
           return (
           <div className="card">
            <div className="card__side card__side--front-3">
              <div className="card__title card__title--3">
                <i className="fas fa-rocket"></i>
                <h4 className="card__heading"> <SyncOutlined spin /></h4>
                <h4 className="card__heading"> Cycle {cycle_id}</h4>
              </div>

              <div className="card__details">
                <ul>
                <li> <b>Cycle ID: </b> {cycle_id}</li>
                   <li> <b>Start Date: </b> {start_date.slice(0,10)}</li>
                   <li> <b>End Date: </b> {end_date.slice(0,10)}</li>
                </ul>
              </div>
            </div>
            <div className="card__side card__side--back card__side--back-3">
              <div className="card__cta">
                <div className="card__price-box">
                  <p className="card__price-value">VIEW MY STATUS</p>
                </div>
                <Button type='default' style={{'backgroundColor': '#0099cc'}}>   
                             <Link to={`/employee/cycles/${cycle_id}/${id}`} style={{ 'color': 'white'}}> 
                                View
                             </Link>  
                        </Button>
              </div>
            </div>
          </div>
          )
          
        }
        else {
          return (
            <div className="card">
             <div className="card__side card__side--front-2">
               <div className="card__title card__title--3">
                 <i className="fas fa-rocket"></i>
                 <h4 className="card__heading"><CarryOutOutlined  /></h4>
                 <h4 className="card__heading"> Cycle {cycle_id}</h4>
               </div>
 
               <div className="card__details">
                 <ul>
                 <li> <b>Cycle ID: </b> {cycle_id}</li>
                   <li> <b>Start Date: </b> {start_date.slice(0,10)}</li>
                   <li> <b>End Date: </b> {end_date.slice(0,10)}</li>
                  
                 </ul>
               </div>
             </div>
             <div className="card__side card__side--back card__side--back-2">
               <div className="card__cta">
                 <div className="card__price-box">
                 <p className="card__price-value">VIEW MY STATUS</p>
                  
                 </div>
                 <Button type="primary" style={{'backgroundColor': '#0099cc'}}>   
                              <Link to={`/employee/cycles/${cycle_id}/${id}`} style={{ 'color': 'white'}}> 
                                 View 
                              </Link>  
                  </Button>
               </div>
             </div>
           </div>
           )
        }    
        
      }) }
      </div> 
      {/* <Router>
      <Route path={`${path}/:id`} ><CycleOverview/> </Route>
     </Router> */}

    </div>
  );
 }

 export default CycleList