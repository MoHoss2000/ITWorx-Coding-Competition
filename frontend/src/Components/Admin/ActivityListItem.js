import React from 'react';
import 'antd/dist/antd.css';
import { Button, Card, Divider, List } from 'antd';
import { CarryOutOutlined, SketchOutlined } from '@ant-design/icons';
import { Link, } from 'react-router-dom'


function ActivityListItem({activity}) {


  
  return (

    <List.Item 
    key={activity.id} 
    >
   
   <Card key={activity.id} title={activity.name} type="inner" 
            extra={<Button type="primary" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            >
              <SketchOutlined />
              <Link to={`/activities/${activity.id}`} style={{ color: 'white', marginLeft: 5 }}>
                View Activity
              </Link>
            </Button>}
            style={{ width: 800, marginTop: 20 }}
            hoverable='true'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <CarryOutOutlined style={{ fontSize: '250%' }} />
              <Divider type="vertical" style={{ height: '50px', marginLeft: '20px' }} />
              <h5 style={{ marginLeft: '20px' }}>{activity.description}</h5>
            </div>
          </Card>
   
  </List.Item>
    


  );
}


export default ActivityListItem;
