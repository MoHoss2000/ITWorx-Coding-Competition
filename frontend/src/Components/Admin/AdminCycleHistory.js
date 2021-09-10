import react ,{useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import 'antd/dist/antd.css';
import { Card, Button, Layout,Divider, Typography} from 'antd';
import {SketchOutlined, CarryOutOutlined} from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom'
import '../components.css';
import CycleOverview from '../General/CycleOverview';
import Spinner from '../General/loadingSpinner';
const { Title } = Typography;


const { Content} = Layout;
function AdminCycleHistory() {
    const [cycles, setCycles] = useState([])
    const [error, setError] = useState(false)
    const [loading,setLoading]=useState(true)
    const { path, url } = useRouteMatch()
    console.log(path)
    console.log(url)

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
       {
      
       cycles.map ( ({id, start_date,end_date}) => (

       <Card key={id} className='cycle-list' title={'Cycle ID' + {id}} type="inner" loading={loading}
                extra={
                        <Button type="primary" style={{'backgroundColor': '#0099cc', color: 'white'}}>   
                            <SketchOutlined />
                            <Link to={{ pathname: `${url}/${id}`, state: { id } }}>
                            View Activity
                            </Link> 
                        </Button>
                    }
                style={{ width: 800, marginTop: 20  }}
                hoverable='true'
                >
      <div style={{display:'flex' , flexDirection :'row' }}>
        <CarryOutOutlined style={{ fontSize: '250%'}} />
        <Divider type="vertical" style={{ height: '50px', marginLeft:'20px'}} />
        <h5 style={{ marginLeft:'20px'}} >{start_date}</h5> 
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
