import { useContext } from 'react';
import {UserContext} from '../../Context'
import 'antd/dist/antd.css';
import {Divider} from 'antd';
import {SyncOutlined, CarryOutOutlined} from '@ant-design/icons';
import CycleCard from '../General/CycleCard'
import '../components.css';




  
    
const CycleList = (props) =>{  
  const {cycleId} = useContext(UserContext)
  return( 
   <div>
      <h1 className= "title"> <b> Cycles History </b></h1>
      <Divider className="title-divider"/>
      <div style={{display:'flex', flexWrap:'wrap'}}> 
      {
       props.cycles.map (({id, start_date,end_date}) => {
        if (id == cycleId){
          return (
            <CycleCard
             className="card__side--front-3"
             cycle_id={id}
             start_date={start_date}
             end_date={end_date}
             text="View Participants"
             url={`/admin/cycles/participants/${id}`}
             icon={<SyncOutlined spin/>}
             id={id}
            />
          )
        }else{
          return (
            <CycleCard
             className="card__side--front-2"
             cycle_id={id}
             start_date={start_date}
             end_date={end_date}
             text="View Participants"
             url={`/admin/cycles/participants/${id}`}
             icon={<CarryOutOutlined/>}
             
            />
           )
        }
       }) 
       }
       </div>
    </div>
  );
 }

 export default CycleList