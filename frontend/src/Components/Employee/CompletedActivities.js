import 'antd/dist/antd.css';
import {Card, Typography, List, Spin, Space, Alert} from 'antd';
import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../Context";
import axios from 'axios';

import {UserOutlined} from '@ant-design/icons';
import ActivityListItem from './ActivityListItem';
import ActivityCard from './ActivityCard';
import NetworkError from '../NetworkError';

const {Title} = Typography;


const tabList = [
  {
    key: 'Assigned',
    tab: 'Assigned',
  },
  {
    key: 'Pending',
    tab: 'Pending',
  },
  {
    key: 'Completed',
    tab: 'Completed',
  },
];
const CompletedActivities = ({activities}) => {

  
  const [activity,setActivity]=useState(null)
  const[displayed , setDisplayed ]=useState([])
  const [error, setError] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);


//   useEffect(() => {
     
//     setError(null)
//     const getCompleted = async () => {
//         const {data} = await (axios.get(`'http://localhost:3001/employee/activities/completed/${id}/${cycleID}`))
//         console.log(data)
//         setActivities(data)
//     } 
//     getCompleted()

//   }, []);

  if(!activities){
    return( 
        <Alert
        message="No Activitites Available"
        description="You didn't complete any activities in this cycle"
        type="info"
        showIcon
      />
    )
  }

else{
  const title=(<div style={{display: "flex", flexDirection: 'row'}}>
    <UserOutlined style={{fontSize: '150%',color:"#b72025"}}/>
    <Title level={2} style={{marginLeft: '20px',color:"#b72025"}}>My Activities</Title>
   </div>)

  return (
    <div>
    <Card
      style={{marginLeft: '10%', marginRight: '10%'}}
      title={title}>
      
    <List
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 5,
    }}
    dataSource={activities}
    renderItem={activity => (
      <ActivityListItem activity={activity} setActivity={setActivity} setIsModalVisible={setIsModalVisible}/>
    )}
  />

    </Card>
    <ActivityCard activity={activity} isModalVisible={isModalVisible}  setIsModalVisible={setIsModalVisible}/>
    </div>
  )
    }
};


export default CompletedActivities;
