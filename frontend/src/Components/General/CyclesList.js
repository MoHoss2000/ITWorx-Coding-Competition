import react ,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Card, Button, Layout,Divider, Typography} from 'antd';
import {SyncOutlined, CarryOutOutlined} from '@ant-design/icons';
import '../components.css';
import CycleOverview from '../General/CycleOverview';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
  } from 'react-router-dom'
const { Title } = Typography; 
  
    
const CycleList = (props) =>{    
   console.log(props)
  return( 
   <div>
      
      <h1 className= "title"> <b> Cycles History </b></h1>
      <Divider className="title-divider"/>
       
      {
      
       props.cycles.map ( ({id, start_date,end_date}) => (
       <Card key={id} className='cycle-list' title={id} type="inner" 
                extra={
                        <Button type="primary" style={{'backgroundColor': '#0099cc', 'color': 'white'}}>   
                            <SyncOutlined/>
                             <Link to={`/admin/cycles/${id}`}> 
                              View Cycle
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
            
           <p> <b> Start Date: </b>{start_date} </p>
            <p> <b> End Date:</b> {end_date} </p>
            </div> 
        </div>
      </Card>
      
      )) }
      {/* <Router>
      <Route path={`${path}/:id`} ><CycleOverview/> </Route>
     </Router> */}

    </div>
  );
 }

 export default CycleList