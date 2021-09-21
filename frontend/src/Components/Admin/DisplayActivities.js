import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { List, Divider , Card, Input} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ActivityListItem from './ActivityListItem';
const { Search } = Input;

function DisplayActivities ({activities}){
    const [displayed, setDisplayed] = useState(activities)
    const onSearch = (value) => {
        const filteredActivities  = activities.filter((activity) => {
            console.log(activity)
            const title = activity.name || activity.title
            const searchValue = value.toLowerCase();
            if(title.toLowerCase().includes(searchValue)){
              return activity
            }   
        })    
        setDisplayed(filteredActivities)
      };
      
return(
        <div>
            
        <h1 className="title">Activities</h1>
            <Divider className="title-divider"/>
        { !activities ? <LoadingOutlined style={{ fontSize: 50 }} spin /> :
        <div className='activities-list'>

  <Card style={{margin: '60px', boxShadow: '10px 8px 20px 0 #b720259d'}}
        extra={
        <Search placeholder="search Activities" onSearch={onSearch} style={{ width: 300 }} 
            /> }>
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
            pageSize: 5,
            }}
            dataSource={displayed}
            renderItem={activity => (
            <ActivityListItem activity={activity}
            />
           
            )}
           
        /> 
         </Card>
         </div>}

        </div>  
        )
    }

export default DisplayActivities;