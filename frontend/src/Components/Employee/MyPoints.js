import React from 'react';
import 'antd/dist/antd.css';
import './css.css';
import { Card, Typography, Divider } from 'antd';
const { Title } = Typography;

const MyPoints = (props) =>{
   console.log(props.data)
  

return(
    <div className='btn'>
        <div className="glow"></div>
        <p className='points'> {props.data.points} </p>
            <div className="orb">
            	<div className="shine"></div>
                
            	<div className="light"></div>
            </div>
           
    </div>
)
        
    
    
}
export default MyPoints