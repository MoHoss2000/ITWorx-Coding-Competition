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
      
      <Title className= "title"> Cycle History</Title>
      <Divider className="title-divider"/>
       
      <Card>  </Card>
      {
       cycles.map ( ({id, start_date,end_date}) => (
       <Card key={id} className='cycle-list' title={id} type="inner" loading={loading}
                extra={
                        <Button type="primary" style={{'backgroundColor': '#0099cc', 'color': 'white'}}>   
                            <SyncOutlined/>
                            {/* <Link to={{ pathname: `${url}/${id}`, state: { id } }}> */}
                            View Cycle
                            {/* </Link>  */}
                        </Button>
                    }
                style={{ width: 800, marginTop: 20  }}
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
      <Router>
      <Route path={`${path}/:id`} ><CycleOverview/> </Route>
     </Router>

    </div>
  );
       }


export default AdminCycleHistory;
