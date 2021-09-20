import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { List, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ActivityListItem from './ActivityListItem';
import DisplayActivities from './DisplayActivities';



function Activities() {
  const [activities, setActivities] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    axios.get('http://localhost:3001/admin/Activities')
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

    <DisplayActivities activities={activities} />
    
  );
}


export default Activities;
