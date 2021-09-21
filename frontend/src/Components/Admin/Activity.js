import 'antd/dist/antd.css';
import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import { Divider } from 'antd';
import EmployeeActivity from './EmployeeActivity';
import ActivityCard from './ActivityCard';
import NetworkError from '../NetworkError';



function Activity() {

  const {id} = useParams();
  const [error,setError]=useState(false)


  if(error){
    return <NetworkError/>
  }

  return (
    <div>
      <h1 className="title">Activity</h1>
      <Divider className="title-divider"/>
      <ActivityCard  id={id} setError={setError} />
      <EmployeeActivity id={id} setError={setError}/>
    </div>


  )


}

export default Activity;
