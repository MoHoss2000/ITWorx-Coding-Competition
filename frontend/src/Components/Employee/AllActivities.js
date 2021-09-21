import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { List, Typography, Divider, Card ,Spin, Input} from 'antd';
import {UserContext} from "../../Context";
import ActivityItem from './ActivityItem';
import ActivityDrawer from './ActivityDrawer';
import NetworkError from '../NetworkError';
const {Title, Text}=Typography 
const { Search } = Input;


function AllActivities() {

  const {id, cycleId }=useContext(UserContext)
  const [activities, setActivities] = useState(null)
  const [displayed, setDisplayed] = useState(null)
  const [activity, setActivity] = useState({})
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false);

  const onSearch = (value) => {

    
    const filteredActivities  = activities.filter((activity) => {
      console.log(activity)
      
        const searchValue= value.toLowerCase();
        if(activity.name.toLowerCase().includes(searchValue)){
          return activity
        }   
        })
    setDisplayed(filteredActivities)

  };

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
       
        setActivities(res.data[0])
        setDisplayed(res.data[0])
        
        
      })
      .catch((e) => {
        setError(true)
       

      })

  }, []);

  if (error) {
    return ( <NetworkError/> )
  }
  if(!displayed){
      return(  <Spin size="large" />) 
  }

  return (
<div>
    
  <h1 className="title">Activities</h1>
    <Divider className="title-divider"/>

  <Card style={{margin: '60px', boxShadow: '10px 8px 20px 0 #b720259d'}}
   extra={
   <Search placeholder="search Activities" onSearch={onSearch} style={{ width: 300 }} 
    /> } >
 
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 10,
    }}
    dataSource={displayed}
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
  