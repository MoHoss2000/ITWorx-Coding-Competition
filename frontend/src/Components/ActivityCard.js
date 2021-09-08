import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Card } from 'antd';


function ActivityCard({activity}) {
    const {name, discription}= activity

    return(
    <Card title={name} extra={<a href="#">View Activity</a>} style={{ width: 300 }}>
      <h3>{discription}</h3>
    </Card>
    );
    
  }


export default ActivityCard;

