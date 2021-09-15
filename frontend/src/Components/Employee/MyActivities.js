import 'antd/dist/antd.css';
import {Card, Typography} from 'antd';
import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../Context";
import axios from 'axios';

import {UserOutlined} from '@ant-design/icons';

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
const MyActivities = () => {

  const {id, cycleId} = useContext(UserContext)
  const [tab, setTab] = useState('Assigned')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const onTabChange = async (key) => {

    setTab(key)

  }

  useEffect(() => {
    console.log("id is: " + id)
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
      console.log(res.data[0])
      setLoading(false)

    })
      .catch((e) => {
        setError("Oops there seems to be a problem connecting to the network")
        console.log(e)


      })

  }, []);

  return (
    <Card
      style={{marginLeft: '10%', marginRight: '10%'}}
      tabList={tabList}
      activeTabKey={tab}
      onTabChange={key => {
        onTabChange(key)
      }}

      title={
        <div style={{display: "flex", flexDirection: 'row'}}>
          <UserOutlined style={{fontSize: '140%'}}/>
          <Title level={3} style={{marginLeft: '20px'}}>My Activities</Title>
        </div>}>
    </Card>
  )
};

export default MyActivities;
