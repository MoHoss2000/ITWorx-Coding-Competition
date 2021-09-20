import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { List, Typography, Divider, Card ,Spin} from 'antd';
import {UserContext} from "../../Context";
import ActivityItem from './ActivityItem';
import ActivityDrawer from './ActivityDrawer';
import NetworkError from '../NetworkError';
const {Title, Text}=Typography 


function AllActivities() {

  const {id, cycleId }=useContext(UserContext)
  const [activities, setActivities] = useState(null)
  const [activity, setActivity] = useState({})
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios(
      {
        method: 'get',
        url: 'http://localhost:3001/employee/allActivities',
        headers: {},
        params: {
          employeeId: id,
          cycleId
        }
     }) .then((res) => {
       //console.log(res.data[0])
        setActivities(res.data[0])
        
      })
      .catch((e) => {
        setError(true)
       // console.warn(e.message)

      })

  }, []);

  if (error) {
    return ( <NetworkError/> )
  }
  if(!activities){
      return(  <Spin size="large" />) 
  }

  return (
<div>
    
  <h1 className="title">Activities</h1>
    <Divider className="title-divider"/>

  <Card  >
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 10,
    }}
    dataSource={activities}
    renderItem={activity => (

       <ActivityItem activity={activity} setActivity={setActivity}  setVisible={setVisible}/>
    )}
   />
   </Card> 
   <ActivityDrawer  activity={activity} visible={visible} setVisible={setVisible} />

</div>  
    
    
  );
}
export default AllActivities;
  