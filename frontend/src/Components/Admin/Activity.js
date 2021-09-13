import 'antd/dist/antd.css';
import React from 'react';
import {useParams} from "react-router-dom";
import { Divider } from 'antd';
import EmployeeActivity from './EmployeeActivity';
import ActivityCard from './ActivityCard';



function Activity() {

  const {id} = useParams();

  return (
    <div>
      <h1 className="title">Activity</h1>
      <Divider className="title-divider"/>
    <ActivityCard  id={id} />
    <EmployeeActivity id={id}/>
    </div>


  )


}

export default Activity;
