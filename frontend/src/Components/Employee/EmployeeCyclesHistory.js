import react ,{useEffect, useState, useContext} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import '../components.css';
import MyCyclesList from './MyCyclesList';
import {UserContext} from '../../Context'



const { Content} = Layout;
function EmployeeCyclesHistory() {
  const {cycleId} =useContext(UserContext)
  console.log(cycleId)
    const [cycles, setCycles] = useState([])
    const [error, setError] = useState("")
    

    useEffect(() => {
      console.log(cycleId)
        axios.get(`http://localhost:3001/employee/cycles/${cycleId}`)
            .then((res) => {  
                setCycles(res.data)
            })
              .catch((e) => {
                setError(e.message)
                
              })
    }, []);


  if(error != ""){
   return ( 
     <div>
        {error}
    </div>
     )}

  else if (cycles===[]) {
    console.log("hi")
    return <div> You didn't participate in any cycles yet</div>  }

  else{
  return (
    <div>
      
      <MyCyclesList cycles={cycles}/>

    </div>
  );
       }
    }


export default EmployeeCyclesHistory;