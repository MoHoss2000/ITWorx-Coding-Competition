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
  const [activities, setActivities] = useState([])
  const [activity, setActivity] = useState({})
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  const [filtered, setFiltered] = useState([]);


  useEffect(() => {
      setFiltered(
        activities.filter((activity) =>
          activity.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        ) 
      );
    }, [searchTerm, activities]);


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
        
        
      })
      .catch((e) => {
        setError(true)
       

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

  <Card style={{margin: '50px 150px', boxShadow: '10px 8px 20px 0 #b720259d'}}
   extra={
   <Search placeholder="search Activities" onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 300 }} 
    /> } >
 
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 10,
    }}
    dataSource={filtered}
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
  