import react ,{useEffect, useState, useContext} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { UserContext } from '../../Context';
import {Layout} from 'antd';
import '../components.css';
import Spinner from '../General/loadingSpinner';
import CycleList from './CyclesList';


const { Content} = Layout;
function AdminCycleHistory() {

    const [current, setCurrent] = useState([])
    const [cycles, setCycles] = useState([])
    const [error, setError] = useState(false)
    const [loading,setLoading]=useState(true)
    useEffect(() => {
        axios.get('http://localhost:3001/admin/cycles')
            .then((res) => {  
                setCycles(res.data)         
                })
              .catch((e) => {
                setError(true)
                console.warn(e.message)
                
              })
    }, []);


  if(error){
   return ( 
       <div>
          {error.message}
       </div>
     )
  }

  if (cycles==[]) {
    return <div> No Cycles Available</div>
  }
  
  return (
    
    <div>
      
      <CycleList cycles={cycles}/>

    </div>
  );
       }


export default AdminCycleHistory;
