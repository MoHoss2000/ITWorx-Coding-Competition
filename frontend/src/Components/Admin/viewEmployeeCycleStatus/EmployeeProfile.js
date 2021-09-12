import React , {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../components.css';
import { Card, Typography, Divider } from 'antd';
import axios from 'axios';
const { Title } = Typography;

const EmployeeProfile = (props) =>{
    const isDeveloper = props.data.is_developer == 1 ? 'Yes' : 'No'
  
return(
 <div>
    <Card className="info-display" >
        <Title level={4}> Employee Information </Title>
        <Divider className="small-divider"/>
         <p> <b> Employee ID: </b> {props.data.id} </p>
         <p> <b> Name:  </b> {props.data.first_name + ' ' + props.data.last_name} </p>
         <p> <b> Email: </b> {props.data.username} </p>
         <p> <b> Is Developer? </b> {isDeveloper} </p> 
      </Card>
</div>
)
}
export default EmployeeProfile