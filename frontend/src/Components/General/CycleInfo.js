import React from 'react';
import 'antd/dist/antd.css';
import '../components.css';
import { Card, Typography, Divider } from 'antd';
const { Title } = Typography;

const CycleInfo = (props) =>{
   console.log(props.data)
  
return(
 <div>
    <Card className={props.className} >
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