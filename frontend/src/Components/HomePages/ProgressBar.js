import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "../../Context";
import axios from 'axios';
import { Progress, Typography, Spin, Space, Row, Col } from 'antd';
import { getBadgeIcon } from '../../Helpers/badge_icons';
import { SketchOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const ProgressBar = () => {

  const { id, cycleId } = useContext(UserContext)
  const [points, setPoints] = useState(null)
  const [employeePoints, setEmployeePoints] = useState(null)
  const [percentage, setPercentage] = useState(null)
  const [error, setError] = useState(false)
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
        const pointsNeeded = res.data.nextBadge.points_needed
        const employeePoints = res.data.pointsInCycle
        
        setLatestBadge(res.data.gainedBadges.slice(-1)[0])
        setEmployeePoints(employeePoints);
        setPoints(pointsNeeded - employeePoints)
        setPercentage(100 - ((pointsNeeded - employeePoints) / pointsNeeded) * 100)

      })
      .catch((e) => {
        setError(true)
      })
  },[])

  if (error) {
    return (
      <div>
        <Progress percent={50} showInfo={false} status="active"/>
        <Text type="secondary">Error loading data. Try refreshing the page</Text>
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
      <Row>
        <Col>
        <img alt="" height='140' src={getBadgeIcon(latestBadge.points_needed)} />
        </Col>
        <Col>

      <div style={{marginTop: '30px'}}>
          <Progress percent={parseInt(percentage)} status="active"/>
          <Text type="secondary">{points} points left for next badge!</Text>
      </div>
      </Col>
      <br />
      </Row>
         <Row>  
           <Col>
      </Col>
      </Row> 
    </div>
  );

}
export default ProgressBar;