import react ,{useEffect, useState, useContext} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Layout, Alert, message, Result, Button} from 'antd';
import '../components.css';
import MyCyclesList from './MyCyclesList';
import {UserContext} from '../../Context'



const { Content} = Layout;
function EmployeeCyclesHistory() {
  const {id} =useContext(UserContext)
  const [cycles, setCycles] = useState([])
  const [error, setError] = useState("")
    

    useEffect(() => {
        axios.get(`http://localhost:3001/employee/cycles/${id}`)
            .then((res) => {  
                setCycles(res.data)
            })
              .catch((e) => {
                message.error("network error")
                setError(e.message)
                
              })
    }, []);


  if(error != ""){
   return ( 

    <Result
    status="500"
    title="Network Error"
    subTitle="Check your connection and try again in a few moments"
    extra={<Button type="primary">Back Home</Button>}
  />
     )}

  else if (cycles.length == 0) {
    console.log("hi")
    return (
        <Alert
          message="No Cycles Available"
          description="You didn't participate in any cycles yet"
          type="info"
          showIcon
        />
    )
  }

  else{
    return (
      <div>
        <MyCyclesList cycles={cycles}/>
      </div>
    );
       }
    }


export default EmployeeCyclesHistory;