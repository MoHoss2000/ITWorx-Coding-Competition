import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { List, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ActivityListItem from './ActivityListItem';

function DisplayActivities ({activities}){
    console.log(activities)
return(
        <div>
            
        <h1 className="title">Activities</h1>
            <Divider className="title-divider"/>
        { !activities ? <LoadingOutlined style={{ fontSize: 50 }} spin /> :
        <div className='activities-list'>
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
            pageSize: 5,
            }}
            dataSource={activities}
            renderItem={activity => (
            <ActivityListItem activity={activity}
            />
            )}
           
        /> 
         </div>}

        </div>  
        )
    }

export default DisplayActivities;