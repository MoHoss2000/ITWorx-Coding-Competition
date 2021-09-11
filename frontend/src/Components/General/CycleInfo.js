import React , {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../components.css';
import { Card, Typography, Divider } from 'antd';
import axios from 'axios';
const { Title } = Typography;

const CycleInfo = (props) =>{
  
return(
 <div>
    <Card className="activities-card" >
         <Title level={4}> Cycle Information </Title>
        <Divider className="small-divider"/>
        <p> <b> Cycle ID: </b> {props.data.id} </p>
         <p> <b>Start Date: </b> {props.data.start_date} </p>
         <p> <b>End Date: </b> {props.data.end_date} </p>
         <p> <b> Cycle Was Created By: </b><a> {props.data.first_name + ' ' + props.data.last_name} </a> </p>
          </Card>
</div>
)
}
export default CycleInfo