import react ,{useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import 'antd/dist/antd.css';
import { Card, Button, Layout,Divider} from 'antd';
import {SketchOutlined, CarryOutOutlined} from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom'
import Activity from './Activity';


const { Content} = Layout;
function Activities() {
    const [activities, setActivities] = useState([])
    const [error, setError] = useState(false)
    const [loading,setLoading]=useState(true)
    const { path, url } = useRouteMatch()
    console.log(path)
    console.log(url)

    useEffect(() => {
        console.log('GETTING ACTIVITIES');
        axios.get('http://localhost:3001/admin/getActivities')
            .then((res) =>{           
                setActivities(res.data)      
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
       <h1> ACTIVITIES</h1>
       <h3>Error fethcing data</h3>
       </div>
     )
  }
  if (activities==[]) {
    return <p>Loading</p>
  }
  
  return (
    
    <div>
      
      
       <h1> ACTIVITIES</h1>
       {
      
       activities.map ( ({id, name,description}) => (
       <Card key={id} title={name} type="inner" loading={loading}
       extra={<Button type="primary"
        >   
       <SketchOutlined />
       <Link to={{ pathname: `${url}/${name}`, state: { id } }}>
       View Activity
       </Link> 
      </Button>}
       style={{ width: 800, marginTop: 20  }}
       hoverable='true'>
      <div style={{display:'flex' , flexDirection :'row' }}>
       <CarryOutOutlined style={{ fontSize: '250%'}} />
       <Divider type="vertical" style={{ height: '50px', marginLeft:'20px'}} />
       <h5 style={{ marginLeft:'20px'}} >{description}</h5> 
       </div>
      </Card>
      
      )) }
      <Router>
      <Route path={`${path}/:name`} ><Activity/> </Route>
     </Router>

    </div>
  );
       }


export default Activities;
