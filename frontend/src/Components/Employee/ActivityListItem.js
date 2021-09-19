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

function ActivityListItem({activity, setActivity, setIsModalVisible}) {

    console.log(activity);
    const [loading, setLoading]=useState(false)

   const updateActivity=()=>{
       setActivity(activity)
       setIsModalVisible(true)
   }
    return (
        <List.Item
        key={activity.id} 
        
        extra= {<div>
            <Text strong >Points: </Text>
            <Text >{activity.points}</Text>
            <SketchOutlined style={{fontSize: '120%',marginLeft:'5px', color:"#87CEFA" }}/>
            <Button style={{ marginLeft:'10px' }} onClick={updateActivity} type="block" > View Activity </Button>
            </div>} >
       
        <List.Item.Meta
          avatar={<CarryOutOutlined style={{fontSize: '150%'}} />}  
          title={
          <Title level={5} >{activity.name}</Title> 
        }
          
        />
        
       <div style={{ display: "flex", direction: "row", marginTop:'10px' }} >

      
        <Text style={{ marginRight:'10px' }} mark>Status:</Text>
        <Text > 
        {activity.status===null && "Unassigned"}
        {activity.status==='A' && "Assigned"}
        {activity.status==='P' && "Pending"}
        {activity.status==='C' && "Complete"}</Text> 
       


        </div>
      </List.Item>
    )
    
}

export default ActivityListItem;