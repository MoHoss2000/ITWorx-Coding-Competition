import React from 'react';
import 'antd/dist/antd.css';
import '../components.css';
import { Card, Typography, Divider } from 'antd';
const { Title } = Typography;

const InfoCard = (props) =>{
   console.log(props.data)
  

return(
   
   
    <div class="container">
    <div class="card">
      <div class="box">
        <div class="content">
          <h2>{props.data.id}</h2>
          <h3>Cycle </h3>
           <div class="card__details">
        
           <li><b>Start Date: </b> {props.data.start_date.slice(0,10)}</li>
           <li> <b>End Date: </b> {props.data.end_date.slice(0,10)}</li>
           
        
        
       </div>
          <a href="#">Read More</a>
        </div>
      </div>
    </div>
 </div>
)
        
    
    
}
export default InfoCard