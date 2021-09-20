import 'antd/dist/antd.css';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import { 
  Typography,
  List,
  Card,
  Select, 
  Button,  
} from 'antd';
import { CarryOutOutlined,SketchOutlined  } from '@ant-design/icons';
const { Option } = Select;
const { Title, Text } = Typography;

function ActivityItem({activity, setActivity, setVisible}) {

    

   const showDrawer=()=>{
       setActivity(activity)
       setVisible(true)
   }
    return (
        <List.Item
        key={activity.id} 
        
        extra= {<div>
            <Text strong >Points: </Text>
            <Text >{activity.points}</Text>
            <SketchOutlined style={{fontSize: '120%',marginLeft:'5px', color:"#87CEFA" }}/>
            <Button id={activity.id} style={{ marginLeft:'10px' }} onClick={showDrawer} type="block" > View Activity </Button>
            </div>} >
       
        <List.Item.Meta
          avatar={<CarryOutOutlined style={{fontSize: '150%'}} />}  
          title={
          <Title level={5} >{activity.name}</Title> 
        }
          
        />
      </List.Item>
    )
    
}

export default ActivityItem;