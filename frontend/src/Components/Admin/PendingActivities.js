import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { List, Divider , Alert, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ActivityListItem from './ActivityListItem';
import DisplayActivities from './DisplayActivities';
import {UserContext} from "../../Context";


function PendingActivities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const {cycleId} = useContext(UserContext)

  useEffect(() => {
    axios.get(`http://localhost:3001/admin/pending/${cycleId}`)
      .then((res) => {
        setActivities(res.data)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.message)
      })

  }, []);
  if (error.length !=0) {
    return (
        <Alert
          message="Something went wrong!"
          description={error}
          type="error"
          showIcon
        />
    )
  }
  if (activities === []) {
    <Alert
    message="No Pending Activities Available"
    description="You don't have any pending activities to check"
    type="info"
    showIcon
  />
  }
if(loading)
  return <Spin large></Spin>



  return (

    <DisplayActivities activities={activities} />
    
  );
}


export default PendingActivities;
