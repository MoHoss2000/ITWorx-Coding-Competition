import 'antd/dist/antd.css';
import {Card, Typography, List, Spin, Space, Divider} from 'antd';
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
const MyActivities = ({divider}) => {
  
  divider = divider ==undefined
  const context = useContext(UserContext)
  const [activities,setActivities]=useState(null)
  const [activity,setActivity]=useState(null)
  const[displayed , setDisplayed ]=useState([])
  const [tab, setTab] = useState('Assigned')
  const [error, setError] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onTabChange = async (key) => {

  setTab(key)
   if (key==="Pending"){
     setDisplayed( activities.filter((employee)=> employee.status==='P'))
   }
   else if (key==="Assigned"){
     setDisplayed( activities.filter((employee)=> employee.status==='A'))
  }
  else{
     setDisplayed( activities.filter((employee)=> employee.status==='C'))

  }

  }

  useEffect(() => {
     const {id, cycleId} = context;
      if (!id) {
        return;
      }
    setError(null)
    axios(
      {
        method: 'get',
        url: 'http://localhost:3001/employee/myActivities',
        headers: {},
        params: {
          employeeId: id,
          cycleId
        }
      }).then((res) => {
      setActivities(res.data[0])
      setDisplayed((res.data[0]).filter((activity)=> activity.status==='A'))
    

    })
      .catch((e) => {
        setError(true)
      })

  }, []);

  if(error){
    return(<NetworkError/>)
  }
  
  if(!activities){
    return(  <Spin size="large" />)
  }


  const title=(<div style={{display: "flex", flexDirection: 'row'}}>
    <UserOutlined style={{fontSize: '150%',color:"#b72025"}}/>
    <Title level={2} style={{marginLeft: '20px',color:"#b72025"}}>My Activities</Title>
   </div>)

  return (
    <div>
      { divider ?
      <div>
       <h1 className="title"> My Activities</h1>
        <Divider className="title-divider"/>
      </div>
      : null
      }
      

    <Card
      style={{margin: '50px 150px 50px 150px', boxShadow: '10px 8px 20px 0 #b720259d'}}
      tabList={tabList}
      activeTabKey={tab}
      onTabChange={key => { onTabChange(key)}}
      >
        <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 5,
        }}
        dataSource={displayed}
        renderItem={activity => (
          <ActivityListItem activity={activity} setActivity={setActivity} setIsModalVisible={setIsModalVisible}/>
        )}
      />

    </Card>
    <ActivityCard activity={activity} isModalVisible={isModalVisible}  setIsModalVisible={setIsModalVisible}/>
    </div>
  )
};

export default MyActivities;
