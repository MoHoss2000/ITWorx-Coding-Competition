import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { List, Typography, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PreviousActivityItem from './PreviousActivityItem';
import { UserContext } from '../../Context';
const {Title}=Typography


function PreviousActivities() {
  const [activities, setActivities] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const {cycleId} = useContext(UserContext)
  

  useEffect(() => {
    console.log('GETTING ACTIVITIES');
    axios.get(`http://localhost:3001/admin/PreviousActivities/${cycleId}`)
      .then((res) => {
        setActivities(res.data)
        setLoading(false)
      })
      .catch((e) => {
        setError(true)
        console.warn(e.message)

      })

  }, []);
  if (error) {
    return (
      <div>
        <h1> ACTIVITIES</h1>
        <h3>Error fetching data</h3>
      </div>
    )
  }
  if (activities === []) {
    return <p>Loading</p>
  }

  return (
<div>
    
  <h1 className="title">Previous Activities</h1>
    <Divider className="title-divider"/>
 { !activities ? <LoadingOutlined style={{ fontSize: 50 }} spin /> :
 <List
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 5,
    }}
    dataSource={activities}
    renderItem={activity => (
      <PreviousActivityItem activity={activity}/>
    )}
   /> }

</div>  
    
    
  );
}


export default PreviousActivities;
