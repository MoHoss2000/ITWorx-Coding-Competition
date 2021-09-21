import 'antd/dist/antd.css';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {UserContext} from "../../Context";
import { Typography, Card, Button} from 'antd';
import { FileDoneOutlined, SketchOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom'
const { Title, Text } = Typography;


function ActivityCard({id,setError}) {

  const {cycleId}=useContext(UserContext)
  const [activity, setActivity] = useState(null)


  useEffect(() => {

    axios(
      {
        method: 'get',
        url: 'http://localhost:3001/admin/viewActivity',
        headers: {},
        params: {
          id,
          CycleId: cycleId
        }
      }).then((res) => {
      console.log(res.data[0][0])
      setActivity(res.data[0][0])
     
    })
      .catch((e) => {
        setError(true)
        console.log(e)


      })

  }, []);



  const flex ={ display: "flex", direction: "row", marginTop:'10px'  }


  if(activity===null){
    return(
    <Card
    style={{marginLeft: '10%', marginRight: '10%'}}   
      loading={true}
    > 
    </Card>)
  }
  const title= (<div style={{ display: "flex", flexDirection :'row'}}>
  <FileDoneOutlined style={{ fontSize: '140%' }} />
  <Title level={3} style={{ marginLeft:'20px'}}>{activity.name}</Title>
</div>)

  return (
    
    <Card
      style={{marginLeft: '10%', marginRight: '10%'}}     
      title={title}
    extra={<Button block>
          <Link to={{pathname:`/editActivity/${id}`}} >
                Edit Activity
          </Link>
         </Button>}  >

          <Card type="inner" title={ <Title level={4} style={{ marginLeft:'20px'}}>Description</Title>} 
          style={{marginTop: '20px'}}>
          <Text style={{fontSize:'140%', marginLeft:'20px'}} italic>{activity.description}</Text>
          </Card> 

        <div style={flex} >
        <Title level={5} style={{fontSize:'140%', marginRight:'10px' }}>Points: 
        </Title> 
        <Text style={{fontSize:'140%'}}> {activity.points}</Text> 
        <SketchOutlined style={{ fontSize:'160%',marginTop:'5px', marginLeft:'5px', color:"#87CEFA"  }} />
        </div>
        
        <div style={flex} >
        <Title level={5} style={{fontSize:'140%', marginRight:'10px' }}>Type: 
        </Title> 
        <Text style={{fontSize:'140%'}}> {activity.type}</Text> 
        </div>
        <div style={flex} >
        <Title level={5} style={{fontSize:'140%', marginRight:'5px' }}>Enabeled: 
        </Title> 
        <Text style={{fontSize:'140%'}}>{activity.enabled ? "True" :"False "}</Text> 
        </div>
       
    </Card>
    


  )


}

export default ActivityCard;
