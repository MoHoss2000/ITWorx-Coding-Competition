import 'antd/dist/antd.css';
import React from 'react';
import {useParams} from "react-router-dom";
import EmployeeActivity from './EmployeeActivity';
import ActivityCard from './ActivityCard';



function Activity() {

  const {id} = useParams();

  return (
    <div>
    <ActivityCard  id={id} />
    <EmployeeActivity id={id}/>
    </div>


  )


}

export default Activity;
