import 'antd/dist/antd.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Typography,
  Card,
  Select,
  Button,
} from 'antd';
import { FileDoneOutlined, SketchOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom'
const { Title, Text } = Typography;


function ActivityCard({id}) {

  const [activity, setActivity] = useState(null)
  const [error, setError] = useState(null)
  const [enabled, setEnabeled]=useState(false)

  const onSwitchClick= ()=>{
      console.log("Hello")
  }
 

  useEffect(() => {

    console.log('GETTING ACTIVITY');
    console.log("id"+ id)
    setError(null)
    axios(
      {
        method: 'get',
        url: 'http://localhost:3001/admin/viewActivity',
        headers: {},
        params: {
          id,
          CycleId: 1
        }
      }).then((res) => {
      console.log(res.data[0][0])
      setActivity(res.data[0][0])
      setEnabeled(activity.enabled)
    })
      .catch((e) => {
        setError("Oops there seems to be a problem connecting to the network")
        console.log(e)


      })

  }, []);
  const flex ={ display: "flex", direction: "row", marginTop:'10px', marginLeft:'10px'  }


  if(activity===null){
    return(
    <Card
      style={{width: '800px'}}
      loading={true}
    > 
    </Card>)
  }

  return (
    
    <Card
      style={{width: "800px"}}     
      title={
      <div style={{ display: "flex", flexDirection :'row'}}>
        <FileDoneOutlined style={{ fontSize: '140%' }} />
        <Title level={3} style={{ marginLeft:'20px'}}>{activity.name}</Title>
    </div>}
    extra={<Button block>
          <Link to={{pathname:`/editActivity/${id}` }} >
                Edit Activity
          </Link>
         </Button>}  >

          <Card type="inner" title="Description" style={{marginTop: '20px'}}>
          <Text italic>{activity.description}</Text>
          </Card> 
        <div style={flex} >
        <Title level={5} style={{ marginRight:'10px' }}>Points: 
        </Title> 
        <Text > {activity.points}</Text> 
        <SketchOutlined style={{ marginTop:'5px', marginLeft:'5px'  }} />
        </div>
        <div style={flex} >
        <Title level={5} style={{ marginRight:'10px' }}>Type: 
        </Title> 
        <Text > {activity.type}</Text> 
        </div>
        <div style={flex} >
        <Title level={5} style={{ marginRight:'5px' }}>Enabeled: 
        </Title> 
        <Text >{activity.enabled ? "True" :"False "}</Text> 
        </div>
    </Card>
    


  )


}

export default ActivityCard;
