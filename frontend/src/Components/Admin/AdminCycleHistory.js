import {useEffect, useState} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import '../components.css';
import CycleList from './CyclesList';

function AdminCycleHistory() {

    const [cycles, setCycles] = useState([])
    const [error, setError] = useState(false)
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        axios.get('http://localhost:3001/admin/cycles')
            .then((res) => {  
                setCycles(res.data)        
                setLoading(false) 
                })
              .catch((e) => {
                setError(true)
                console.warn(e.message)
                
              })
    }, []);


  if(loading)
    return <Spin large/>

  if(error){
   return ( 
       <div>
          {error.message}
       </div>
     )
  }

  if (cycles === []) {
    return <div> No Cycles Available</div>
  }
  
  return (
    
    <div>
      <CycleList cycles={cycles}/>
    </div>
  );
       }


export default AdminCycleHistory;