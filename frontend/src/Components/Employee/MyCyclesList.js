import react ,{ useContext} from 'react';
import 'antd/dist/antd.css';
import { Card, Button, Layout, Divider, Typography} from 'antd';
import {SyncOutlined, CarryOutOutlined} from '@ant-design/icons';
import '../components.css';
import {UserContext} from '../../Context'
import {
    BrowserRouter as Router,
    Link,
  } from 'react-router-dom'
import CycleCard from '../General/CycleCard';


const CycleList = (props) =>{  
  const {id, cycleId} = useContext(UserContext)
  
  return( 
   <div>
      <h1 className= "title"> <b> My Cycles History </b></h1>
      <Divider className="title-divider"/>
     <div style={{display:'flex', flexWrap:'wrap'}}> 
      {
       props.cycles.map ( ({cycle_id, start_date, end_date}) => {
        if (cycle_id == cycleId){
           return (
            <CycleCard
             className="card__side--front-3"
             cycle_id={cycleId}
             start_date={start_date}
             end_date={end_date}
             text="View My Status"
             url={`/employee/cycles/${cycle_id}/${id}`}
             icon={<SyncOutlined spin/>}
            />
          )
        }
        else {
          return (
            <CycleCard
             className="card__side--front-2"
             cycle_id={cycle_id}
             start_date={start_date}
             end_date={end_date}
             text="View My Status"
             url={`/employee/cycles/${cycle_id}/${id}`}
             icon={<CarryOutOutlined/>}
            />
           )
        }    
      }) }
      </div> 
    </div>
  );
 }

 export default CycleList