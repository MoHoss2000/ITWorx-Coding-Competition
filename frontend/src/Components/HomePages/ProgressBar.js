import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "../../Context";
import axios from 'axios';
import { Progress, Typography, Spin, Space } from 'antd';
import { getBadgeIcon } from '../../Helpers/badge_icons';
import { SketchOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const ProgressBar = () => {

  const { id, cycleId } = useContext(UserContext)
  const [points, setPoints] = useState(null)
  const [employeePoints, setEmployeePoints] = useState(null)
  const [percentage, setPercentage] = useState(null)
  const [error, setError] = useState(false)
  const [nextBadge, setNextBadge] = useState(null);
  const [latestBadge, setLatestBadge] = useState(null);

  useEffect(() => {

    axios(
      {
        method: 'get',
        url: 'http://localhost:3001/employee/badges',
        headers: {},
        params: {
          employeeId: id,
          cycleId
        }
      }).then((res) => {
        // console.log(res)
        const pointsNeeded = res.data.nextBadge.points_needed
        const employeePoints = res.data.pointsInCycle


        var l = [];
        
        setLatestBadge(res.data.gainedBadges.slice(-1)[0])
        setEmployeePoints(employeePoints);
        setNextBadge(res.data.nextBadge);
        setPoints(pointsNeeded - employeePoints)
        setPercentage(100 - ((pointsNeeded - employeePoints) / pointsNeeded) * 100)

      })
      .catch((e) => {
        setError(true)
      })
  })

  if (error) {
    return (
      <div>
        <Progress percent={50} showInfo={false} />
        <Text type="secondary">Error loading data</Text>
      </div>
    )
  }
  if (percentage === null) {
    return (
      <Space size="middle">
        <Spin size="small" />
      </Space>)
  }

  return (
    <div style={{ width: 400 }}>

      <Title level={3} strong={true}>My Points: {employeePoints}  <SketchOutlined style={{ fontSize: '100%', color: "#87CEFA" }} /></Title>
      
      <div style={{ display: 'flex', flexDirection: 'row', alignItems:'center' }}>
        <img height='50' src={getBadgeIcon(latestBadge.points_needed)} />

        <Text style={{marginBottom: '5px'}} strong={true} type='secondary'>{latestBadge.name} [ Points Needed: {latestBadge.points_needed}</Text>
        <SketchOutlined style={{ fontSize: '100%', color: "#87CEFA", marginLeft:'4px', marginBottom: '5px' }} />
        <Text strong={true} type='secondary'>]</Text>
      </div>
      
      <Progress percent={percentage} />
      <Text type="secondary">{points} points left for next badge!</Text>
      <br />


      <div style={{ display: 'flex', flexDirection: 'row', alignItems:'center' }}>
        <img height='50' src={getBadgeIcon(nextBadge.points_needed)} />

        <Text style={{marginBottom: '5px'}} strong={true} type='secondary'>{nextBadge.name} [ Points Needed: {nextBadge.points_needed}</Text>
        <SketchOutlined style={{ fontSize: '100%', color: "#87CEFA", marginLeft:'4px', marginBottom: '5px' }} />
        <Text strong={true} type='secondary'>]</Text>

      </div>

    </div>
  );

}
export default ProgressBar;