import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { List, Divider, Card ,Spin, Input} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ActivityListItem from './ActivityListItem';
import NetworkError from '../NetworkError';
import Activity from './Activity';
const { Search } = Input;



function Activities() {
  const [activities, setActivities] = useState(null)
  const [displayed, setDisplayed] = useState(null)
  const [error, setError] = useState(false)
  
  
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
   
    axios.get('http://localhost:3001/admin/Activities')
      .then((res) => {
        setActivities(res.data)
        setDisplayed(res.data)
        
      })
      .catch((e) => {
        setError(true)
        console.warn(e.message)

      })

  }, []);
  if (error) {
    return (<NetworkError/>)
  }
  if (displayed ===null) {
    return <Spin size='large'/>
  }

  return (
<div>
    
  <h1 className="title">Activities</h1>
    <Divider className="title-divider"/>
  <Card  extra={<Search placeholder="search Activities" onSearch={onSearch} style={{ width: 200 }} /> }>
 <List
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 10,
    }}
    dataSource={displayed}
    renderItem={activity => (
      <ActivityListItem activity={activity}/>
    )}
   /> 
   </Card>
</div>      
  );
}
export default Activities;
