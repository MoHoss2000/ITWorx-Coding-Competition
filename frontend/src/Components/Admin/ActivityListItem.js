import React from 'react';
import 'antd/dist/antd.css';
import { Button, List, Typography } from 'antd';
import { CarryOutOutlined, SketchOutlined } from '@ant-design/icons';
import { Link, } from 'react-router-dom'
const { Title } = Typography;


function ActivityListItem({activity}) {
  return (
  <div>


  <List.Item
        key={activity.id} 
        
        extra= {<Button type="primary" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        >
          <SketchOutlined />
          <Link to={`/activities/${activity.id}`} style={{ color: 'white', marginLeft: 5 }}>
            View Activity
          </Link>
        </Button>} >
       
        <List.Item.Meta
          avatar={<CarryOutOutlined style={{fontSize: '200%'}} />}  
          title={
          <Title level={5} >{activity.name}</Title> 
        }
          
        />
        
       
      </List.Item>

  </div>
          


  );
}


export default ActivityListItem;
