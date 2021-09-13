import react ,{useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import 'antd/dist/antd.css';
import { Card, Button, Layout,Divider, Typography} from 'antd';
import {SyncOutlined, CarryOutOutlined} from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from 'react-router-dom'
import '../components.css';
import CycleOverview from '../General/CycleOverview';
import Spinner from '../General/loadingSpinner';
import CycleList from '../General/CyclesList';
const { Title } = Typography;


const { Content} = Layout;
function AdminCycleHistory() {

    const [current, setCurrent] = useState([])
    const [cycles, setCycles] = useState([])
    const [error, setError] = useState(false)
    const [loading,setLoading]=useState(true)
    const { path, url } = useRouteMatch()
    console.log(path)
    console.log(url)
    var currentCycleID = 1
    useEffect(() => {
        axios.get('http://localhost:3001/admin/cycles')
            .then((res) => {  
                // console.log(res.data)
                // res.data.map( cyc =>{
                //             if(cyc.id == currentCycleID){
                //                 setCurrent(cyc)
                //                 console.log(current)
                //             } 
                // })
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
    
       </div>
     )
  }

  if (cycles==[]) {
    return <Spinner />
  }
  
  return (
    
    <div>
      
      <CycleList cycles={cycles}/>

    </div>
  );
       }


export default AdminCycleHistory;
