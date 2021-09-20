import { useContext, useState, useEffect } from 'react';
import {UserContext} from '../../Context'
import 'antd/dist/antd.css';
import {Divider, Input} from 'antd';
import {SyncOutlined, CarryOutOutlined} from '@ant-design/icons';
import CycleCard from '../General/CycleCard'
import '../components.css';
const { Search } = Input;


const CycleList = (props) =>{  
  const {cycleId} = useContext(UserContext)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCycles, setFilteredCycles] = useState([]);

  useEffect(() => {
    setFilteredCycles(
      props.cycles.filter((cycle) =>
        cycle.start_date.includes(searchTerm) || cycle.end_date.includes(searchTerm) 
      ) 
    );
  }, [searchTerm]);

  return( 
   <div>
      <h1 className= "title"> <b> Cycles History </b></h1>
      <Divider className="title-divider"/>
      <div style={{display:'flex', flexDirection:'row-reverse'}}>
      <Search
        allowClear
        enterButton="Search"
        size="large"
        style={{width:'30%', margin: '2%'}}
        placeholder="Search Cycle By Date"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
      <div style={{display:'flex', flexWrap:'wrap'}}> 
      {
       filteredCycles.map (({id, start_date,end_date}) => {
        if (id == cycleId){
          return (
            <CycleCard
             className="card__side--front-3"
             cycle_id={id}
             start_date={start_date}
             end_date={end_date}
             text="Cycle Overview"
             url={`/admin/cycles/overview/${id}`}
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
             text="Cycle Overview"
             url={`/admin/cycles/overview/${id}`}
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