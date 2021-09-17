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
       
      {
      
       props.cycles.map ( ({cycle_id, start_date, end_date}) => {
        if (cycle_id ==cycleId){
           return <Card key={cycle_id} className='cycle-list-current' title={`Current Cycle - Cycle ID:  ${cycle_id}`}  type="inner" 
           extra={
             
                    <Button type="primary" style={{'backgroundColor': '#0099cc'}}>   
                        <Link to={`/employee/cycles/${cycle_id}/${id}`} style={{ 'color': 'white'}}> 
                            View My Status
                        </Link>  
                    </Button>
                }
                style={{ width: '70%', marginTop: 20 }}
                hoverable='true'
                >
             
                
                <div style={{display:'flex' , flexDirection :'row' }}>
                <SyncOutlined style={{ fontSize: '250%'}} />
                <Divider type="vertical" style={{ height: '50px', marginLeft:'20px'}} />
                <div style={{ marginLeft:'20px'}} >
                    
                  <p> <b> Start Date: </b>{start_date.slice(0,10)} </p>
                    <p> <b> End Date:</b> {end_date.slice(0,10)} </p>
                    </div> 
                </div>
          </Card> 
          
          
        }
        else {
           return <Card key={cycle_id} className='cycle-list' title={`Cycle ID: ${cycle_id}`} type="inner" 
                extra={
                        <Button type="primary" style={{'backgroundColor': '#0099cc'}}>   
                             <Link to={`/employee/cycles/${cycle_id}/${id}`} style={{ 'color': 'white'}}> 
                                View My Status
                             </Link>  
                        </Button>
                    }
                style={{ width: '70%', marginTop: 20 }}
                hoverable='true'
                >
              <div style={{display:'flex' , flexDirection :'row' }}>
                <CarryOutOutlined style={{ fontSize: '250%'}} />
                <Divider type="vertical" style={{ height: '50px', marginLeft:'20px'}} />
                <div style={{ marginLeft:'20px'}} >
                    
                  <p> <b> Start Date: </b>{start_date.slice(0,10)} </p>
                  <p> <b> End Date:</b> {end_date.slice(0,10)} </p>
                </div> 
                </div>
       </Card>
        }           
      }) }
      {/* <Router>
      <Route path={`${path}/:id`} ><CycleOverview/> </Route>
     </Router> */}

    </div>
  );
 }

 export default CycleList