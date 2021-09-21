import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import NetworkError from '../NetworkError';
import DisplayActivities from './DisplayActivities';

function Activities() {
  const [activities, setActivities] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/admin/Activities')
      .then((res) => {
        setActivities(res.data)        
      })
      .catch((e) => {
        setError(true)
        console.warn(e.message)
      })
  }, []);
  if (error) {
    return (<NetworkError/>)
  }
  if (activities ===null) {
    return <Spin size='large'/>
  }

  return (

    <DisplayActivities activities={activities} />
    
  );
}
export default Activities;
